import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateNestedOneWithoutMembersInputObjectSchema as OrganizationCreateNestedOneWithoutMembersInputObjectSchema } from './OrganizationCreateNestedOneWithoutMembersInput.schema';
import { AuthUserCreateNestedOneWithoutMembersInputObjectSchema as AuthUserCreateNestedOneWithoutMembersInputObjectSchema } from './AuthUserCreateNestedOneWithoutMembersInput.schema';
import { LabStaffCreateNestedOneWithoutMemberInputObjectSchema as LabStaffCreateNestedOneWithoutMemberInputObjectSchema } from './LabStaffCreateNestedOneWithoutMemberInput.schema';
import { FileUploadGrantCreateNestedManyWithoutCreatedByMemberInputObjectSchema as FileUploadGrantCreateNestedManyWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantCreateNestedManyWithoutCreatedByMemberInput.schema';
import { StoredFileCreateNestedManyWithoutUploaderMemberInputObjectSchema as StoredFileCreateNestedManyWithoutUploaderMemberInputObjectSchema } from './StoredFileCreateNestedManyWithoutUploaderMemberInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputObjectSchema),
  authuser: z.lazy(() => AuthUserCreateNestedOneWithoutMembersInputObjectSchema),
  labStaff: z.lazy(() => LabStaffCreateNestedOneWithoutMemberInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantCreateNestedManyWithoutCreatedByMemberInputObjectSchema).optional(),
  uploadedStoredFiles: z.lazy(() => StoredFileCreateNestedManyWithoutUploaderMemberInputObjectSchema).optional()
}).strict();
export const MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema: z.ZodType<Prisma.MemberCreateWithoutCreatedCaseFileVersionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateWithoutCreatedCaseFileVersionsInput>;
export const MemberCreateWithoutCreatedCaseFileVersionsInputObjectZodSchema = makeSchema();
