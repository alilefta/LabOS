import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateManyUploaderMemberInputObjectSchema as StoredFileCreateManyUploaderMemberInputObjectSchema } from './StoredFileCreateManyUploaderMemberInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StoredFileCreateManyUploaderMemberInputObjectSchema), z.lazy(() => StoredFileCreateManyUploaderMemberInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StoredFileCreateManyUploaderMemberInputEnvelopeObjectSchema: z.ZodType<Prisma.StoredFileCreateManyUploaderMemberInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateManyUploaderMemberInputEnvelope>;
export const StoredFileCreateManyUploaderMemberInputEnvelopeObjectZodSchema = makeSchema();
