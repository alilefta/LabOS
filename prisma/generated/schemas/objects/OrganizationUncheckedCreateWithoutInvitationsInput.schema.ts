import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './MemberUncheckedCreateNestedManyWithoutOrganizationInput.schema';
import { LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema as LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema } from './LabUncheckedCreateNestedOneWithoutOrganizationInput.schema';
import { FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional(),
  lab: z.lazy(() => LabUncheckedCreateNestedOneWithoutOrganizationInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedCreateWithoutInvitationsInput>;
export const OrganizationUncheckedCreateWithoutInvitationsInputObjectZodSchema = makeSchema();
