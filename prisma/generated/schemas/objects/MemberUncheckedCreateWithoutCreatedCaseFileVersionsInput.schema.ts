import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffUncheckedCreateNestedOneWithoutMemberInputObjectSchema as LabStaffUncheckedCreateNestedOneWithoutMemberInputObjectSchema } from './LabStaffUncheckedCreateNestedOneWithoutMemberInput.schema';
import { FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInput.schema';
import { StoredFileUncheckedCreateNestedManyWithoutUploaderMemberInputObjectSchema as StoredFileUncheckedCreateNestedManyWithoutUploaderMemberInputObjectSchema } from './StoredFileUncheckedCreateNestedManyWithoutUploaderMemberInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date(),
  labStaff: z.lazy(() => LabStaffUncheckedCreateNestedOneWithoutMemberInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema).optional(),
  uploadedStoredFiles: z.lazy(() => StoredFileUncheckedCreateNestedManyWithoutUploaderMemberInputObjectSchema).optional()
}).strict();
export const MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutCreatedCaseFileVersionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateWithoutCreatedCaseFileVersionsInput>;
export const MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectZodSchema = makeSchema();
