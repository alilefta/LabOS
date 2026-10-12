import 'server-only'

import { z } from 'zod'

import { UPLOAD_GRANT_ERROR_CODES, UploadGrantError } from './upload-grants'
import {
	prismaCaseClinicalCallbackRepository,
	type CaseClinicalCallbackRepository,
} from './case-clinical-callback.repository'

const callbackSchema = z.object({
	metadata: z.object({ uploadGrantId: z.string().uuid() }).strict(),
	file: z.object({ key: z.string().min(1).max(1024).regex(/^[^\s\x00-\x1f\x7f]+$/) }).strict(),
}).strict()

export function createCaseClinicalCallbackHandoff(repository: CaseClinicalCallbackRepository) {
	return async (input: unknown): Promise<Readonly<{ uploadGrantId: string }>> => {
		const parsed = callbackSchema.safeParse(input)
		if (!parsed.success || parsed.data.file.key.includes('://')) {
			throw new UploadGrantError(UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED)
		}
		await repository.reserve({
			uploadGrantId: parsed.data.metadata.uploadGrantId,
			providerObjectKey: parsed.data.file.key,
		})
		return Object.freeze({ uploadGrantId: parsed.data.metadata.uploadGrantId })
	}
}

/** Must be invoked only by the UploadThing-verified callback hook. */
export const handoffVerifiedCaseClinicalCallback = createCaseClinicalCallbackHandoff(
	prismaCaseClinicalCallbackRepository,
)
