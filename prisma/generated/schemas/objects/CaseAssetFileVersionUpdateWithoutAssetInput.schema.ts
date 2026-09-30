import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StoredFileUpdateOneRequiredWithoutCaseVersionNestedInputObjectSchema as StoredFileUpdateOneRequiredWithoutCaseVersionNestedInputObjectSchema } from './StoredFileUpdateOneRequiredWithoutCaseVersionNestedInput.schema';
import { MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInputObjectSchema as MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInputObjectSchema } from './MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInput.schema';
import { CaseAssetFileUpdateOneWithoutCurrentVersionNestedInputObjectSchema as CaseAssetFileUpdateOneWithoutCurrentVersionNestedInputObjectSchema } from './CaseAssetFileUpdateOneWithoutCurrentVersionNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  versionNumber: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdByMemberIdSnapshot: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  storedFile: z.lazy(() => StoredFileUpdateOneRequiredWithoutCaseVersionNestedInputObjectSchema).optional(),
  createdByMember: z.lazy(() => MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInputObjectSchema).optional(),
  currentForAsset: z.lazy(() => CaseAssetFileUpdateOneWithoutCurrentVersionNestedInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionUpdateWithoutAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateWithoutAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateWithoutAssetInput>;
export const CaseAssetFileVersionUpdateWithoutAssetInputObjectZodSchema = makeSchema();
