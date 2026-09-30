import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MemberUpdateManyWithoutOrganizationNestedInputObjectSchema as MemberUpdateManyWithoutOrganizationNestedInputObjectSchema } from './MemberUpdateManyWithoutOrganizationNestedInput.schema';
import { InvitationUpdateManyWithoutOrganizationNestedInputObjectSchema as InvitationUpdateManyWithoutOrganizationNestedInputObjectSchema } from './InvitationUpdateManyWithoutOrganizationNestedInput.schema';
import { LabUpdateOneWithoutOrganizationNestedInputObjectSchema as LabUpdateOneWithoutOrganizationNestedInputObjectSchema } from './LabUpdateOneWithoutOrganizationNestedInput.schema';
import { FileUploadGrantUpdateManyWithoutOrganizationNestedInputObjectSchema as FileUploadGrantUpdateManyWithoutOrganizationNestedInputObjectSchema } from './FileUploadGrantUpdateManyWithoutOrganizationNestedInput.schema';
import { StoredFileUpdateManyWithoutOrganizationNestedInputObjectSchema as StoredFileUpdateManyWithoutOrganizationNestedInputObjectSchema } from './StoredFileUpdateManyWithoutOrganizationNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  logo: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  metadata: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutOrganizationNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneWithoutOrganizationNestedInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantUpdateManyWithoutOrganizationNestedInputObjectSchema).optional(),
  storedFiles: z.lazy(() => StoredFileUpdateManyWithoutOrganizationNestedInputObjectSchema).optional()
}).strict();
export const OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateWithoutClinicalUploadEvidenceInput>;
export const OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
