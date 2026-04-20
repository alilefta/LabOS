import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema'

const makeSchema = () => z.object({
  set: CaseActivityTypeSchema.optional()
}).strict();
export const EnumCaseActivityTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCaseActivityTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseActivityTypeFieldUpdateOperationsInput>;
export const EnumCaseActivityTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
