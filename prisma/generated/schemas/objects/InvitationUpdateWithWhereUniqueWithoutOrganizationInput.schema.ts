import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithoutOrganizationInputObjectSchema as InvitationUpdateWithoutOrganizationInputObjectSchema } from './InvitationUpdateWithoutOrganizationInput.schema';
import { InvitationUncheckedUpdateWithoutOrganizationInputObjectSchema as InvitationUncheckedUpdateWithoutOrganizationInputObjectSchema } from './InvitationUncheckedUpdateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InvitationUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutOrganizationInputObjectSchema)])
}).strict();
export const InvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutOrganizationInput>;
export const InvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
