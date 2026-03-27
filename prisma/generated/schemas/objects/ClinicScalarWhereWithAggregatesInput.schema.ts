import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumClinicStatusWithAggregatesFilterObjectSchema as EnumClinicStatusWithAggregatesFilterObjectSchema } from './EnumClinicStatusWithAggregatesFilter.schema';
import { ClinicStatusSchema } from '../enums/ClinicStatus.schema';
import { EnumClinicTypeWithAggregatesFilterObjectSchema as EnumClinicTypeWithAggregatesFilterObjectSchema } from './EnumClinicTypeWithAggregatesFilter.schema';
import { ClinicTypeSchema } from '../enums/ClinicType.schema';
import { DecimalNullableWithAggregatesFilterObjectSchema as DecimalNullableWithAggregatesFilterObjectSchema } from './DecimalNullableWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const clinicscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ClinicScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ClinicScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ClinicScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ClinicScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ClinicScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  website: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumClinicStatusWithAggregatesFilterObjectSchema), ClinicStatusSchema]).optional(),
  type: z.union([z.lazy(() => EnumClinicTypeWithAggregatesFilterObjectSchema), ClinicTypeSchema]).optional(),
  city: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  zipcode: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  address1: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  address2: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  phoneNumber: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  billingEmail: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  billingPhoneNumber: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  taxNumber: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  discount: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'discount' must be a Decimal",
})]).optional().nullable(),
  creditLimit: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'creditLimit' must be a Decimal",
})]).optional().nullable(),
  currentBalance: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'currentBalance' must be a Decimal",
})]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ClinicScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ClinicScalarWhereWithAggregatesInput> = clinicscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ClinicScalarWhereWithAggregatesInput>;
export const ClinicScalarWhereWithAggregatesInputObjectZodSchema = clinicscalarwherewithaggregatesinputSchema;
