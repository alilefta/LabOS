import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateNestedOneWithoutMembersInputObjectSchema as OrganizationCreateNestedOneWithoutMembersInputObjectSchema } from './OrganizationCreateNestedOneWithoutMembersInput.schema';
import { AuthUserCreateNestedOneWithoutMembersInputObjectSchema as AuthUserCreateNestedOneWithoutMembersInputObjectSchema } from './AuthUserCreateNestedOneWithoutMembersInput.schema';
import { LabStaffCreateNestedOneWithoutMemberInputObjectSchema as LabStaffCreateNestedOneWithoutMemberInputObjectSchema } from './LabStaffCreateNestedOneWithoutMemberInput.schema';
import { StoredFileCreateNestedManyWithoutUploaderMemberInputObjectSchema as StoredFileCreateNestedManyWithoutUploaderMemberInputObjectSchema } from './StoredFileCreateNestedManyWithoutUploaderMemberInput.schema';
import { CaseAssetFileVersionCreateNestedManyWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionCreateNestedManyWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionCreateNestedManyWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputObjectSchema),
  authuser: z.lazy(() => AuthUserCreateNestedOneWithoutMembersInputObjectSchema),
  labStaff: z.lazy(() => LabStaffCreateNestedOneWithoutMemberInputObjectSchema).optional(),
  uploadedStoredFiles: z.lazy(() => StoredFileCreateNestedManyWithoutUploaderMemberInputObjectSchema).optional(),
  createdCaseFileVersions: z.lazy(() => CaseAssetFileVersionCreateNestedManyWithoutCreatedByMemberInputObjectSchema).optional()
}).strict();
export const MemberCreateWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.MemberCreateWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateWithoutFileUploadGrantsInput>;
export const MemberCreateWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
