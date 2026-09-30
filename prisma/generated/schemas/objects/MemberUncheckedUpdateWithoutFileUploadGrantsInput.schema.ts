import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabStaffUncheckedUpdateOneWithoutMemberNestedInputObjectSchema as LabStaffUncheckedUpdateOneWithoutMemberNestedInputObjectSchema } from './LabStaffUncheckedUpdateOneWithoutMemberNestedInput.schema';
import { StoredFileUncheckedUpdateManyWithoutUploaderMemberNestedInputObjectSchema as StoredFileUncheckedUpdateManyWithoutUploaderMemberNestedInputObjectSchema } from './StoredFileUncheckedUpdateManyWithoutUploaderMemberNestedInput.schema';
import { CaseAssetFileVersionUncheckedUpdateManyWithoutCreatedByMemberNestedInputObjectSchema as CaseAssetFileVersionUncheckedUpdateManyWithoutCreatedByMemberNestedInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateManyWithoutCreatedByMemberNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  organizationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  labStaff: z.lazy(() => LabStaffUncheckedUpdateOneWithoutMemberNestedInputObjectSchema).optional(),
  uploadedStoredFiles: z.lazy(() => StoredFileUncheckedUpdateManyWithoutUploaderMemberNestedInputObjectSchema).optional(),
  createdCaseFileVersions: z.lazy(() => CaseAssetFileVersionUncheckedUpdateManyWithoutCreatedByMemberNestedInputObjectSchema).optional()
}).strict();
export const MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedUpdateWithoutFileUploadGrantsInput>;
export const MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
