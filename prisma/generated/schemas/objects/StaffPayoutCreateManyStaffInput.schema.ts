import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { PayoutStatusSchema } from '../enums/PayoutStatus.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  payoutNumber: z.string(),
  labId: z.string(),
  amount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
}),
  method: PaymentMethodSchema.optional(),
  status: PayoutStatusSchema.optional(),
  reference: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  paidAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const StaffPayoutCreateManyStaffInputObjectSchema: z.ZodType<Prisma.StaffPayoutCreateManyStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutCreateManyStaffInput>;
export const StaffPayoutCreateManyStaffInputObjectZodSchema = makeSchema();
