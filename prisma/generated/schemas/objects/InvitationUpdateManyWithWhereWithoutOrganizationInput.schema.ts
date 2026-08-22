import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationScalarWhereInputObjectSchema as InvitationScalarWhereInputObjectSchema } from './InvitationScalarWhereInput.schema';
import { InvitationUpdateManyMutationInputObjectSchema as InvitationUpdateManyMutationInputObjectSchema } from './InvitationUpdateManyMutationInput.schema';
import { InvitationUncheckedUpdateManyWithoutOrganizationInputObjectSchema as InvitationUncheckedUpdateManyWithoutOrganizationInputObjectSchema } from './InvitationUncheckedUpdateManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InvitationUpdateManyMutationInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateManyWithoutOrganizationInputObjectSchema)])
}).strict();
export const InvitationUpdateManyWithWhereWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutOrganizationInput>;
export const InvitationUpdateManyWithWhereWithoutOrganizationInputObjectZodSchema = makeSchema();
