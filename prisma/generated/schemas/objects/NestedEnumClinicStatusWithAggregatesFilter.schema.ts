import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicStatusSchema } from '../enums/ClinicStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumClinicStatusFilterObjectSchema as NestedEnumClinicStatusFilterObjectSchema } from './NestedEnumClinicStatusFilter.schema'

const nestedenumclinicstatuswithaggregatesfilterSchema = z.object({
  equals: ClinicStatusSchema.optional(),
  in: ClinicStatusSchema.array().optional(),
  notIn: ClinicStatusSchema.array().optional(),
  not: z.union([ClinicStatusSchema, z.lazy(() => NestedEnumClinicStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumClinicStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumClinicStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumClinicStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumClinicStatusWithAggregatesFilter> = nestedenumclinicstatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumClinicStatusWithAggregatesFilter>;
export const NestedEnumClinicStatusWithAggregatesFilterObjectZodSchema = nestedenumclinicstatuswithaggregatesfilterSchema;
