import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ToothPositionSchema } from '../enums/ToothPosition.schema';
import { NestedEnumToothPositionFilterObjectSchema as NestedEnumToothPositionFilterObjectSchema } from './NestedEnumToothPositionFilter.schema'

const makeSchema = () => z.object({
  equals: ToothPositionSchema.optional(),
  in: ToothPositionSchema.array().optional(),
  notIn: ToothPositionSchema.array().optional(),
  not: z.union([ToothPositionSchema, z.lazy(() => NestedEnumToothPositionFilterObjectSchema)]).optional()
}).strict();
export const EnumToothPositionFilterObjectSchema: z.ZodType<Prisma.EnumToothPositionFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumToothPositionFilter>;
export const EnumToothPositionFilterObjectZodSchema = makeSchema();
