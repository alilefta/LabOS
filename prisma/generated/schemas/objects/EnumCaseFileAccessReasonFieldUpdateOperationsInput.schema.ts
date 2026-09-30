import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAccessReasonSchema } from '../enums/CaseFileAccessReason.schema'

const makeSchema = () => z.object({
  set: CaseFileAccessReasonSchema.optional()
}).strict();
export const EnumCaseFileAccessReasonFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCaseFileAccessReasonFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseFileAccessReasonFieldUpdateOperationsInput>;
export const EnumCaseFileAccessReasonFieldUpdateOperationsInputObjectZodSchema = makeSchema();
