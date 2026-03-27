import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const dentistscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => DentistScalarWhereInputObjectSchema), z.lazy(() => DentistScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DentistScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DentistScalarWhereInputObjectSchema), z.lazy(() => DentistScalarWhereInputObjectSchema).array()]).optional(),
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
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const DentistScalarWhereInputObjectSchema: z.ZodType<Prisma.DentistScalarWhereInput> = dentistscalarwhereinputSchema as unknown as z.ZodType<Prisma.DentistScalarWhereInput>;
export const DentistScalarWhereInputObjectZodSchema = dentistscalarwhereinputSchema;
