import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateNestedManyWithoutOrganizationInputObjectSchema as MemberCreateNestedManyWithoutOrganizationInputObjectSchema } from './MemberCreateNestedManyWithoutOrganizationInput.schema';
import { InvitationCreateNestedManyWithoutOrganizationInputObjectSchema as InvitationCreateNestedManyWithoutOrganizationInputObjectSchema } from './InvitationCreateNestedManyWithoutOrganizationInput.schema';
import { LabCreateNestedOneWithoutOrganizationInputObjectSchema as LabCreateNestedOneWithoutOrganizationInputObjectSchema } from './LabCreateNestedOneWithoutOrganizationInput.schema';
import { StoredFileCreateNestedManyWithoutOrganizationInputObjectSchema as StoredFileCreateNestedManyWithoutOrganizationInputObjectSchema } from './StoredFileCreateNestedManyWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceCreateNestedManyWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceCreateNestedManyWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceCreateNestedManyWithoutOrganizationInput.schema'

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
  storedFiles: z.lazy(() => StoredFileCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  clinicalUploadEvidence: z.lazy(() => CaseClinicalUploadEvidenceCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationCreateWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.OrganizationCreateWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateWithoutFileUploadGrantsInput>;
export const OrganizationCreateWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
