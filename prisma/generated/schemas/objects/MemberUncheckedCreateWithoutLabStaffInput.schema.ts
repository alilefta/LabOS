import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date(),
  fileUploadGrants: z.lazy(() => FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema).optional()
}).strict();
export const MemberUncheckedCreateWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateWithoutLabStaffInput>;
export const MemberUncheckedCreateWithoutLabStaffInputObjectZodSchema = makeSchema();
