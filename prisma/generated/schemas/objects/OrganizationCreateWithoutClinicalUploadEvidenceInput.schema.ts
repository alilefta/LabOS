import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateNestedManyWithoutOrganizationInputObjectSchema as MemberCreateNestedManyWithoutOrganizationInputObjectSchema } from './MemberCreateNestedManyWithoutOrganizationInput.schema';
import { InvitationCreateNestedManyWithoutOrganizationInputObjectSchema as InvitationCreateNestedManyWithoutOrganizationInputObjectSchema } from './InvitationCreateNestedManyWithoutOrganizationInput.schema';
import { LabCreateNestedOneWithoutOrganizationInputObjectSchema as LabCreateNestedOneWithoutOrganizationInputObjectSchema } from './LabCreateNestedOneWithoutOrganizationInput.schema';
import { FileUploadGrantCreateNestedManyWithoutOrganizationInputObjectSchema as FileUploadGrantCreateNestedManyWithoutOrganizationInputObjectSchema } from './FileUploadGrantCreateNestedManyWithoutOrganizationInput.schema';
import { StoredFileCreateNestedManyWithoutOrganizationInputObjectSchema as StoredFileCreateNestedManyWithoutOrganizationInputObjectSchema } from './StoredFileCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutOrganizationInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  storedFiles: z.lazy(() => StoredFileCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.OrganizationCreateWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateWithoutClinicalUploadEvidenceInput>;
export const OrganizationCreateWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
