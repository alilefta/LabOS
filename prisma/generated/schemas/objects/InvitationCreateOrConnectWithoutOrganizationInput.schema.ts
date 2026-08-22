import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationCreateWithoutOrganizationInputObjectSchema as InvitationCreateWithoutOrganizationInputObjectSchema } from './InvitationCreateWithoutOrganizationInput.schema';
import { InvitationUncheckedCreateWithoutOrganizationInputObjectSchema as InvitationUncheckedCreateWithoutOrganizationInputObjectSchema } from './InvitationUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvitationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const InvitationCreateOrConnectWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateOrConnectWithoutOrganizationInput>;
export const InvitationCreateOrConnectWithoutOrganizationInputObjectZodSchema = makeSchema();
