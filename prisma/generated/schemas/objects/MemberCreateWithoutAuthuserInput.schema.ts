import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateNestedOneWithoutMembersInputObjectSchema as OrganizationCreateNestedOneWithoutMembersInputObjectSchema } from './OrganizationCreateNestedOneWithoutMembersInput.schema';
import { LabStaffCreateNestedOneWithoutMemberInputObjectSchema as LabStaffCreateNestedOneWithoutMemberInputObjectSchema } from './LabStaffCreateNestedOneWithoutMemberInput.schema';
import { FileUploadGrantCreateNestedManyWithoutCreatedByMemberInputObjectSchema as FileUploadGrantCreateNestedManyWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantCreateNestedManyWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputObjectSchema),
  labStaff: z.lazy(() => LabStaffCreateNestedOneWithoutMemberInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantCreateNestedManyWithoutCreatedByMemberInputObjectSchema).optional()
}).strict();
export const MemberCreateWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.MemberCreateWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateWithoutAuthuserInput>;
export const MemberCreateWithoutAuthuserInputObjectZodSchema = makeSchema();
