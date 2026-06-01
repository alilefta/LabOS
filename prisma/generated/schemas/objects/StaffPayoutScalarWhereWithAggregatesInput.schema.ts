import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { EnumPaymentMethodWithAggregatesFilterObjectSchema as EnumPaymentMethodWithAggregatesFilterObjectSchema } from './EnumPaymentMethodWithAggregatesFilter.schema';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { EnumPayoutStatusWithAggregatesFilterObjectSchema as EnumPayoutStatusWithAggregatesFilterObjectSchema } from './EnumPayoutStatusWithAggregatesFilter.schema';
import { PayoutStatusSchema } from '../enums/PayoutStatus.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const staffpayoutscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffPayoutScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => StaffPayoutScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffPayoutScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffPayoutScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => StaffPayoutScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  payoutNumber: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  staffId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  method: z.union([z.lazy(() => EnumPaymentMethodWithAggregatesFilterObjectSchema), PaymentMethodSchema]).optional(),
  status: z.union([z.lazy(() => EnumPayoutStatusWithAggregatesFilterObjectSchema), PayoutStatusSchema]).optional(),
  reference: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  paidAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const StaffPayoutScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.StaffPayoutScalarWhereWithAggregatesInput> = staffpayoutscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.StaffPayoutScalarWhereWithAggregatesInput>;
export const StaffPayoutScalarWhereWithAggregatesInputObjectZodSchema = staffpayoutscalarwherewithaggregatesinputSchema;
