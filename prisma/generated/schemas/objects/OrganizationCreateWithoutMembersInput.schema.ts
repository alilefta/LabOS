import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateNestedManyWithoutOrganizationInputObjectSchema as InvitationCreateNestedManyWithoutOrganizationInputObjectSchema } from './InvitationCreateNestedManyWithoutOrganizationInput.schema';
import { LabCreateNestedOneWithoutOrganizationInputObjectSchema as LabCreateNestedOneWithoutOrganizationInputObjectSchema } from './LabCreateNestedOneWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationCreateWithoutMembersInputObjectSchema: z.ZodType<Prisma.OrganizationCreateWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateWithoutMembersInput>;
export const OrganizationCreateWithoutMembersInputObjectZodSchema = makeSchema();
