import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicTypeSchema } from '../enums/ClinicType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumClinicTypeFilterObjectSchema as NestedEnumClinicTypeFilterObjectSchema } from './NestedEnumClinicTypeFilter.schema'

const nestedenumclinictypewithaggregatesfilterSchema = z.object({
  equals: ClinicTypeSchema.optional(),
  in: ClinicTypeSchema.array().optional(),
  notIn: ClinicTypeSchema.array().optional(),
  not: z.union([ClinicTypeSchema, z.lazy(() => NestedEnumClinicTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumClinicTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumClinicTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumClinicTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumClinicTypeWithAggregatesFilter> = nestedenumclinictypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumClinicTypeWithAggregatesFilter>;
export const NestedEnumClinicTypeWithAggregatesFilterObjectZodSchema = nestedenumclinictypewithaggregatesfilterSchema;
