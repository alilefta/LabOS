import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './MemberUncheckedCreateNestedManyWithoutOrganizationInput.schema';
import { InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './InvitationUncheckedCreateNestedManyWithoutOrganizationInput.schema';
import { FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationUncheckedCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedCreateWithoutLabInput>;
export const OrganizationUncheckedCreateWithoutLabInputObjectZodSchema = makeSchema();
