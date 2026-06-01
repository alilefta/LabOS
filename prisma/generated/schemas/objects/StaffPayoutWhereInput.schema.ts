import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { EnumPaymentMethodFilterObjectSchema as EnumPaymentMethodFilterObjectSchema } from './EnumPaymentMethodFilter.schema';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { EnumPayoutStatusFilterObjectSchema as EnumPayoutStatusFilterObjectSchema } from './EnumPayoutStatusFilter.schema';
import { PayoutStatusSchema } from '../enums/PayoutStatus.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabStaffScalarRelationFilterObjectSchema as LabStaffScalarRelationFilterObjectSchema } from './LabStaffScalarRelationFilter.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { CaseStaffAssignmentListRelationFilterObjectSchema as CaseStaffAssignmentListRelationFilterObjectSchema } from './CaseStaffAssignmentListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const staffpayoutwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffPayoutWhereInputObjectSchema), z.lazy(() => StaffPayoutWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffPayoutWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffPayoutWhereInputObjectSchema), z.lazy(() => StaffPayoutWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  payoutNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  staffId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  method: z.union([z.lazy(() => EnumPaymentMethodFilterObjectSchema), PaymentMethodSchema]).optional(),
  status: z.union([z.lazy(() => EnumPayoutStatusFilterObjectSchema), PayoutStatusSchema]).optional(),
  reference: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  paidAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  staff: z.union([z.lazy(() => LabStaffScalarRelationFilterObjectSchema), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional(),
  caseAssignments: z.lazy(() => CaseStaffAssignmentListRelationFilterObjectSchema).optional()
}).strict();
export const StaffPayoutWhereInputObjectSchema: z.ZodType<Prisma.StaffPayoutWhereInput> = staffpayoutwhereinputSchema as unknown as z.ZodType<Prisma.StaffPayoutWhereInput>;
export const StaffPayoutWhereInputObjectZodSchema = staffpayoutwhereinputSchema;
