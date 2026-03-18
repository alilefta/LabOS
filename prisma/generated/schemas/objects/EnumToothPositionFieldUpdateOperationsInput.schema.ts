import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ToothPositionSchema } from '../enums/ToothPosition.schema'

const makeSchema = () => z.object({
  set: ToothPositionSchema.optional()
}).strict();
export const EnumToothPositionFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumToothPositionFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumToothPositionFieldUpdateOperationsInput>;
export const EnumToothPositionFieldUpdateOperationsInputObjectZodSchema = makeSchema();
