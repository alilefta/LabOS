import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './MemberUncheckedCreateNestedManyWithoutOrganizationInput.schema';
import { InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './InvitationUncheckedCreateNestedManyWithoutOrganizationInput.schema';
import { LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema as LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema } from './LabUncheckedCreateNestedOneWithoutOrganizationInput.schema';
import { FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInput.schema';
import { StoredFileUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as StoredFileUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './StoredFileUncheckedCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  lab: z.lazy(() => LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  storedFiles: z.lazy(() => StoredFileUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInput>;
export const OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
