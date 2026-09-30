import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseAssetFileUpdateOneRequiredWithoutVersionsNestedInputObjectSchema as CaseAssetFileUpdateOneRequiredWithoutVersionsNestedInputObjectSchema } from './CaseAssetFileUpdateOneRequiredWithoutVersionsNestedInput.schema';
import { StoredFileUpdateOneRequiredWithoutCaseVersionNestedInputObjectSchema as StoredFileUpdateOneRequiredWithoutCaseVersionNestedInputObjectSchema } from './StoredFileUpdateOneRequiredWithoutCaseVersionNestedInput.schema';
import { MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInputObjectSchema as MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInputObjectSchema } from './MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  versionNumber: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdByMemberIdSnapshot: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  asset: z.lazy(() => CaseAssetFileUpdateOneRequiredWithoutVersionsNestedInputObjectSchema).optional(),
  storedFile: z.lazy(() => StoredFileUpdateOneRequiredWithoutCaseVersionNestedInputObjectSchema).optional(),
  createdByMember: z.lazy(() => MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateWithoutCurrentForAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateWithoutCurrentForAssetInput>;
export const CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectZodSchema = makeSchema();
