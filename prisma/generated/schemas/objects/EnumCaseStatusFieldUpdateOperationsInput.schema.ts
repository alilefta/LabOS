import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema'

const makeSchema = () => z.object({
  set: CaseStatusSchema.optional()
}).strict();
export const EnumCaseStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCaseStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseStatusFieldUpdateOperationsInput>;
export const EnumCaseStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
