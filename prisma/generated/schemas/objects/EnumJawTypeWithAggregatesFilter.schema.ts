import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { JawTypeSchema } from '../enums/JawType.schema';
import { NestedEnumJawTypeWithAggregatesFilterObjectSchema as NestedEnumJawTypeWithAggregatesFilterObjectSchema } from './NestedEnumJawTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumJawTypeFilterObjectSchema as NestedEnumJawTypeFilterObjectSchema } from './NestedEnumJawTypeFilter.schema'

const makeSchema = () => z.object({
  equals: JawTypeSchema.optional(),
  in: JawTypeSchema.array().optional(),
  notIn: JawTypeSchema.array().optional(),
  not: z.union([JawTypeSchema, z.lazy(() => NestedEnumJawTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumJawTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumJawTypeFilterObjectSchema).optional()
}).strict();
export const EnumJawTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumJawTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumJawTypeWithAggregatesFilter>;
export const EnumJawTypeWithAggregatesFilterObjectZodSchema = makeSchema();
