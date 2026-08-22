import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './InvitationUncheckedCreateNestedManyWithoutOrganizationInput.schema';
import { LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema as LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema } from './LabUncheckedCreateNestedOneWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  lab: z.lazy(() => LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationUncheckedCreateWithoutMembersInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedCreateWithoutMembersInput>;
export const OrganizationUncheckedCreateWithoutMembersInputObjectZodSchema = makeSchema();
