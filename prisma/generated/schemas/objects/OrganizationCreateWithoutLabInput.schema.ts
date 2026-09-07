import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateNestedManyWithoutOrganizationInputObjectSchema as MemberCreateNestedManyWithoutOrganizationInputObjectSchema } from './MemberCreateNestedManyWithoutOrganizationInput.schema';
import { InvitationCreateNestedManyWithoutOrganizationInputObjectSchema as InvitationCreateNestedManyWithoutOrganizationInputObjectSchema } from './InvitationCreateNestedManyWithoutOrganizationInput.schema';
import { FileUploadGrantCreateNestedManyWithoutOrganizationInputObjectSchema as FileUploadGrantCreateNestedManyWithoutOrganizationInputObjectSchema } from './FileUploadGrantCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.OrganizationCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateWithoutLabInput>;
export const OrganizationCreateWithoutLabInputObjectZodSchema = makeSchema();
