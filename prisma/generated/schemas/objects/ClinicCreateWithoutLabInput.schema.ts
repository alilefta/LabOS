import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { ClinicStatusSchema } from '../enums/ClinicStatus.schema';
import { ClinicTypeSchema } from '../enums/ClinicType.schema';
import { CaseCreateNestedManyWithoutClinicInputObjectSchema as CaseCreateNestedManyWithoutClinicInputObjectSchema } from './CaseCreateNestedManyWithoutClinicInput.schema';
import { DentistCreateNestedManyWithoutClinicInputObjectSchema as DentistCreateNestedManyWithoutClinicInputObjectSchema } from './DentistCreateNestedManyWithoutClinicInput.schema';
import { CasePricingPlanCreateNestedManyWithoutClinicInputObjectSchema as CasePricingPlanCreateNestedManyWithoutClinicInputObjectSchema } from './CasePricingPlanCreateNestedManyWithoutClinicInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  status: ClinicStatusSchema.optional(),
  type: ClinicTypeSchema.optional(),
  city: z.string(),
  zipcode: z.string().optional().nullable(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  email: z.string(),
  phoneNumber: z.string(),
  billingEmail: z.string().optional().nullable(),
  billingPhoneNumber: z.string().optional().nullable(),
  taxNumber: z.string().optional().nullable(),
  discount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'discount' must be a Decimal",
}).optional().nullable(),
  creditLimit: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'creditLimit' must be a Decimal",
}).optional().nullable(),
  currentBalance: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'currentBalance' must be a Decimal",
}).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutClinicInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistCreateNestedManyWithoutClinicInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanCreateNestedManyWithoutClinicInputObjectSchema).optional()
}).strict();
export const ClinicCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.ClinicCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateWithoutLabInput>;
export const ClinicCreateWithoutLabInputObjectZodSchema = makeSchema();
