import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { CaseListRelationFilterObjectSchema as CaseListRelationFilterObjectSchema } from './CaseListRelationFilter.schema'

const technicianwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => TechnicianWhereInputObjectSchema), z.lazy(() => TechnicianWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TechnicianWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TechnicianWhereInputObjectSchema), z.lazy(() => TechnicianWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  firstName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  lastName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  city: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  zipcode: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  address1: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  address2: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phoneNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  avatarUrl: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  Lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  cases: z.lazy(() => CaseListRelationFilterObjectSchema).optional()
}).strict();
export const TechnicianWhereInputObjectSchema: z.ZodType<Prisma.TechnicianWhereInput> = technicianwhereinputSchema as unknown as z.ZodType<Prisma.TechnicianWhereInput>;
export const TechnicianWhereInputObjectZodSchema = technicianwhereinputSchema;
