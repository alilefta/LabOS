import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumCaseStatusFilterObjectSchema as EnumCaseStatusFilterObjectSchema } from './EnumCaseStatusFilter.schema';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { EnumFaultPartyNullableFilterObjectSchema as EnumFaultPartyNullableFilterObjectSchema } from './EnumFaultPartyNullableFilter.schema';
import { FaultPartySchema } from '../enums/FaultParty.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const casescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseScalarWhereInputObjectSchema), z.lazy(() => CaseScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseScalarWhereInputObjectSchema), z.lazy(() => CaseScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  patientId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseCategoryId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumCaseStatusFilterObjectSchema), CaseStatusSchema]).optional(),
  grandTotal: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'grandTotal' must be a Decimal",
})]).optional().nullable(),
  clinicId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  dentistId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  deadline: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  isRemake: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  originalCaseId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  failureReason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  failureFault: z.union([z.lazy(() => EnumFaultPartyNullableFilterObjectSchema), FaultPartySchema]).optional().nullable(),
  completedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  deliveredAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const CaseScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseScalarWhereInput> = casescalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseScalarWhereInput>;
export const CaseScalarWhereInputObjectZodSchema = casescalarwhereinputSchema;
