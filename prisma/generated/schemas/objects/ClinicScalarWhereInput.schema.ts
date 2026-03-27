import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumClinicStatusFilterObjectSchema as EnumClinicStatusFilterObjectSchema } from './EnumClinicStatusFilter.schema';
import { ClinicStatusSchema } from '../enums/ClinicStatus.schema';
import { EnumClinicTypeFilterObjectSchema as EnumClinicTypeFilterObjectSchema } from './EnumClinicTypeFilter.schema';
import { ClinicTypeSchema } from '../enums/ClinicType.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const clinicscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ClinicScalarWhereInputObjectSchema), z.lazy(() => ClinicScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ClinicScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ClinicScalarWhereInputObjectSchema), z.lazy(() => ClinicScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  website: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumClinicStatusFilterObjectSchema), ClinicStatusSchema]).optional(),
  type: z.union([z.lazy(() => EnumClinicTypeFilterObjectSchema), ClinicTypeSchema]).optional(),
  city: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  zipcode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  address1: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  address2: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phoneNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  billingEmail: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  billingPhoneNumber: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  taxNumber: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  discount: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'discount' must be a Decimal",
})]).optional().nullable(),
  creditLimit: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'creditLimit' must be a Decimal",
})]).optional().nullable(),
  currentBalance: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'currentBalance' must be a Decimal",
})]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ClinicScalarWhereInputObjectSchema: z.ZodType<Prisma.ClinicScalarWhereInput> = clinicscalarwhereinputSchema as unknown as z.ZodType<Prisma.ClinicScalarWhereInput>;
export const ClinicScalarWhereInputObjectZodSchema = clinicscalarwhereinputSchema;
