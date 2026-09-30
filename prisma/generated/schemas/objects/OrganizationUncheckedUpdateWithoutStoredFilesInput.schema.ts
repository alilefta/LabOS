import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MemberUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema as MemberUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema } from './MemberUncheckedUpdateManyWithoutOrganizationNestedInput.schema';
import { InvitationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema as InvitationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema } from './InvitationUncheckedUpdateManyWithoutOrganizationNestedInput.schema';
import { LabUncheckedUpdateOneWithoutOrganizationNestedInputObjectSchema as LabUncheckedUpdateOneWithoutOrganizationNestedInputObjectSchema } from './LabUncheckedUpdateOneWithoutOrganizationNestedInput.schema';
import { FileUploadGrantUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema as FileUploadGrantUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema } from './FileUploadGrantUncheckedUpdateManyWithoutOrganizationNestedInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutOrganizationNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  logo: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  metadata: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUncheckedUpdateOneWithoutOrganizationNestedInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema).optional(),
  clinicalUploadEvidence: z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema).optional()
}).strict();
export const OrganizationUncheckedUpdateWithoutStoredFilesInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutStoredFilesInput>;
export const OrganizationUncheckedUpdateWithoutStoredFilesInputObjectZodSchema = makeSchema();
