import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicTypeSchema } from '../enums/ClinicType.schema'

const nestedenumclinictypefilterSchema = z.object({
  equals: ClinicTypeSchema.optional(),
  in: ClinicTypeSchema.array().optional(),
  notIn: ClinicTypeSchema.array().optional(),
  not: z.union([ClinicTypeSchema, z.lazy(() => NestedEnumClinicTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumClinicTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumClinicTypeFilter> = nestedenumclinictypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumClinicTypeFilter>;
export const NestedEnumClinicTypeFilterObjectZodSchema = nestedenumclinictypefilterSchema;
