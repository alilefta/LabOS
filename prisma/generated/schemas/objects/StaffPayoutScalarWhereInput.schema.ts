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
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const staffpayoutscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffPayoutScalarWhereInputObjectSchema), z.lazy(() => StaffPayoutScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffPayoutScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffPayoutScalarWhereInputObjectSchema), z.lazy(() => StaffPayoutScalarWhereInputObjectSchema).array()]).optional(),
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
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const StaffPayoutScalarWhereInputObjectSchema: z.ZodType<Prisma.StaffPayoutScalarWhereInput> = staffpayoutscalarwhereinputSchema as unknown as z.ZodType<Prisma.StaffPayoutScalarWhereInput>;
export const StaffPayoutScalarWhereInputObjectZodSchema = staffpayoutscalarwhereinputSchema;
