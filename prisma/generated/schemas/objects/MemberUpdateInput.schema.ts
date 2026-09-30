import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectSchema as OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectSchema } from './OrganizationUpdateOneRequiredWithoutMembersNestedInput.schema';
import { AuthUserUpdateOneRequiredWithoutMembersNestedInputObjectSchema as AuthUserUpdateOneRequiredWithoutMembersNestedInputObjectSchema } from './AuthUserUpdateOneRequiredWithoutMembersNestedInput.schema';
import { LabStaffUpdateOneWithoutMemberNestedInputObjectSchema as LabStaffUpdateOneWithoutMemberNestedInputObjectSchema } from './LabStaffUpdateOneWithoutMemberNestedInput.schema';
import { FileUploadGrantUpdateManyWithoutCreatedByMemberNestedInputObjectSchema as FileUploadGrantUpdateManyWithoutCreatedByMemberNestedInputObjectSchema } from './FileUploadGrantUpdateManyWithoutCreatedByMemberNestedInput.schema';
import { StoredFileUpdateManyWithoutUploaderMemberNestedInputObjectSchema as StoredFileUpdateManyWithoutUploaderMemberNestedInputObjectSchema } from './StoredFileUpdateManyWithoutUploaderMemberNestedInput.schema';
import { CaseAssetFileVersionUpdateManyWithoutCreatedByMemberNestedInputObjectSchema as CaseAssetFileVersionUpdateManyWithoutCreatedByMemberNestedInputObjectSchema } from './CaseAssetFileVersionUpdateManyWithoutCreatedByMemberNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectSchema).optional(),
  authuser: z.lazy(() => AuthUserUpdateOneRequiredWithoutMembersNestedInputObjectSchema).optional(),
  labStaff: z.lazy(() => LabStaffUpdateOneWithoutMemberNestedInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantUpdateManyWithoutCreatedByMemberNestedInputObjectSchema).optional(),
  uploadedStoredFiles: z.lazy(() => StoredFileUpdateManyWithoutUploaderMemberNestedInputObjectSchema).optional(),
  createdCaseFileVersions: z.lazy(() => CaseAssetFileVersionUpdateManyWithoutCreatedByMemberNestedInputObjectSchema).optional()
}).strict();
export const MemberUpdateInputObjectSchema: z.ZodType<Prisma.MemberUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateInput>;
export const MemberUpdateInputObjectZodSchema = makeSchema();
