import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabStaffUncheckedUpdateOneWithoutMemberNestedInputObjectSchema as LabStaffUncheckedUpdateOneWithoutMemberNestedInputObjectSchema } from './LabStaffUncheckedUpdateOneWithoutMemberNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  organizationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  labStaff: z.lazy(() => LabStaffUncheckedUpdateOneWithoutMemberNestedInputObjectSchema).optional()
}).strict();
export const MemberUncheckedUpdateWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedUpdateWithoutAuthuserInput>;
export const MemberUncheckedUpdateWithoutAuthuserInputObjectZodSchema = makeSchema();
