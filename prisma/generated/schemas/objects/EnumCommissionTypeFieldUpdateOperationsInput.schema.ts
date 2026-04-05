import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CommissionTypeSchema } from '../enums/CommissionType.schema'

const makeSchema = () => z.object({
  set: CommissionTypeSchema.optional()
}).strict();
export const EnumCommissionTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCommissionTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCommissionTypeFieldUpdateOperationsInput>;
export const EnumCommissionTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
