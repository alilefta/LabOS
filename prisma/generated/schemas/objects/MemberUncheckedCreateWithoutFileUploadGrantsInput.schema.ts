import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffUncheckedCreateNestedOneWithoutMemberInputObjectSchema as LabStaffUncheckedCreateNestedOneWithoutMemberInputObjectSchema } from './LabStaffUncheckedCreateNestedOneWithoutMemberInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date(),
  labStaff: z.lazy(() => LabStaffUncheckedCreateNestedOneWithoutMemberInputObjectSchema).optional()
}).strict();
export const MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateWithoutFileUploadGrantsInput>;
export const MemberUncheckedCreateWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
