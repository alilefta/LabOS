import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffUncheckedCreateNestedOneWithoutMemberInputObjectSchema as LabStaffUncheckedCreateNestedOneWithoutMemberInputObjectSchema } from './LabStaffUncheckedCreateNestedOneWithoutMemberInput.schema';
import { FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateNestedManyWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date(),
  labStaff: z.lazy(() => LabStaffUncheckedCreateNestedOneWithoutMemberInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema).optional(),
  createdCaseFileVersions: z.lazy(() => CaseAssetFileVersionUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema).optional()
}).strict();
export const MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutUploadedStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateWithoutUploadedStoredFilesInput>;
export const MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectZodSchema = makeSchema();
