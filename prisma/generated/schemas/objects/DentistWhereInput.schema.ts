import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ClinicScalarRelationFilterObjectSchema as ClinicScalarRelationFilterObjectSchema } from './ClinicScalarRelationFilter.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { CaseListRelationFilterObjectSchema as CaseListRelationFilterObjectSchema } from './CaseListRelationFilter.schema'

const dentistwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => DentistWhereInputObjectSchema), z.lazy(() => DentistWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DentistWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DentistWhereInputObjectSchema), z.lazy(() => DentistWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  clinicId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  phoneNumber: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  isOwner: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  isDefault: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  clinic: z.union([z.lazy(() => ClinicScalarRelationFilterObjectSchema), z.lazy(() => ClinicWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  cases: z.lazy(() => CaseListRelationFilterObjectSchema).optional()
}).strict();
export const DentistWhereInputObjectSchema: z.ZodType<Prisma.DentistWhereInput> = dentistwhereinputSchema as unknown as z.ZodType<Prisma.DentistWhereInput>;
export const DentistWhereInputObjectZodSchema = dentistwhereinputSchema;
