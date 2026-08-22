import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithoutOrganizationInputObjectSchema as InvitationUpdateWithoutOrganizationInputObjectSchema } from './InvitationUpdateWithoutOrganizationInput.schema';
import { InvitationUncheckedUpdateWithoutOrganizationInputObjectSchema as InvitationUncheckedUpdateWithoutOrganizationInputObjectSchema } from './InvitationUncheckedUpdateWithoutOrganizationInput.schema';
import { InvitationCreateWithoutOrganizationInputObjectSchema as InvitationCreateWithoutOrganizationInputObjectSchema } from './InvitationCreateWithoutOrganizationInput.schema';
import { InvitationUncheckedCreateWithoutOrganizationInputObjectSchema as InvitationUncheckedCreateWithoutOrganizationInputObjectSchema } from './InvitationUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InvitationUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutOrganizationInputObjectSchema)]),
  create: z.union([z.lazy(() => InvitationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const InvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutOrganizationInput>;
export const InvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
