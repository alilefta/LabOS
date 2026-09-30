import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './MemberUncheckedCreateNestedManyWithoutOrganizationInput.schema';
import { InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './InvitationUncheckedCreateNestedManyWithoutOrganizationInput.schema';
import { LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema as LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema } from './LabUncheckedCreateNestedOneWithoutOrganizationInput.schema';
import { StoredFileUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as StoredFileUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './StoredFileUncheckedCreateNestedManyWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateNestedManyWithoutOrganizationInput.schema'

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
  storedFiles: z.lazy(() => StoredFileUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  clinicalUploadEvidence: z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedCreateWithoutFileUploadGrantsInput>;
export const OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
