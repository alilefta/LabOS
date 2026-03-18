import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ToothPositionSchema } from '../enums/ToothPosition.schema'

const nestedenumtoothpositionfilterSchema = z.object({
  equals: ToothPositionSchema.optional(),
  in: ToothPositionSchema.array().optional(),
  notIn: ToothPositionSchema.array().optional(),
  not: z.union([ToothPositionSchema, z.lazy(() => NestedEnumToothPositionFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumToothPositionFilterObjectSchema: z.ZodType<Prisma.NestedEnumToothPositionFilter> = nestedenumtoothpositionfilterSchema as unknown as z.ZodType<Prisma.NestedEnumToothPositionFilter>;
export const NestedEnumToothPositionFilterObjectZodSchema = nestedenumtoothpositionfilterSchema;
