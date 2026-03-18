import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ToothPositionSchema } from '../enums/ToothPosition.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumToothPositionFilterObjectSchema as NestedEnumToothPositionFilterObjectSchema } from './NestedEnumToothPositionFilter.schema'

const nestedenumtoothpositionwithaggregatesfilterSchema = z.object({
  equals: ToothPositionSchema.optional(),
  in: ToothPositionSchema.array().optional(),
  notIn: ToothPositionSchema.array().optional(),
  not: z.union([ToothPositionSchema, z.lazy(() => NestedEnumToothPositionWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumToothPositionFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumToothPositionFilterObjectSchema).optional()
}).strict();
export const NestedEnumToothPositionWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumToothPositionWithAggregatesFilter> = nestedenumtoothpositionwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumToothPositionWithAggregatesFilter>;
export const NestedEnumToothPositionWithAggregatesFilterObjectZodSchema = nestedenumtoothpositionwithaggregatesfilterSchema;
