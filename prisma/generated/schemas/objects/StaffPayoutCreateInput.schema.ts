import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { PayoutStatusSchema } from '../enums/PayoutStatus.schema';
import { LabCreateNestedOneWithoutStaffPayoutsInputObjectSchema as LabCreateNestedOneWithoutStaffPayoutsInputObjectSchema } from './LabCreateNestedOneWithoutStaffPayoutsInput.schema';
import { LabStaffCreateNestedOneWithoutStaffPayoutsInputObjectSchema as LabStaffCreateNestedOneWithoutStaffPayoutsInputObjectSchema } from './LabStaffCreateNestedOneWithoutStaffPayoutsInput.schema';
import { CaseStaffAssignmentCreateNestedManyWithoutPayoutInputObjectSchema as CaseStaffAssignmentCreateNestedManyWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentCreateNestedManyWithoutPayoutInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  payoutNumber: z.string(),
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
  lab: z.lazy(() => LabCreateNestedOneWithoutStaffPayoutsInputObjectSchema),
  staff: z.lazy(() => LabStaffCreateNestedOneWithoutStaffPayoutsInputObjectSchema),
  caseAssignments: z.lazy(() => CaseStaffAssignmentCreateNestedManyWithoutPayoutInputObjectSchema).optional()
}).strict();
export const StaffPayoutCreateInputObjectSchema: z.ZodType<Prisma.StaffPayoutCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutCreateInput>;
export const StaffPayoutCreateInputObjectZodSchema = makeSchema();
