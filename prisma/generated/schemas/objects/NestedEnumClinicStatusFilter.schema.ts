import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicStatusSchema } from '../enums/ClinicStatus.schema'

const nestedenumclinicstatusfilterSchema = z.object({
  equals: ClinicStatusSchema.optional(),
  in: ClinicStatusSchema.array().optional(),
  notIn: ClinicStatusSchema.array().optional(),
  not: z.union([ClinicStatusSchema, z.lazy(() => NestedEnumClinicStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumClinicStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumClinicStatusFilter> = nestedenumclinicstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumClinicStatusFilter>;
export const NestedEnumClinicStatusFilterObjectZodSchema = nestedenumclinicstatusfilterSchema;
