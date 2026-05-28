import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffCreateWithoutLabInvitationInputObjectSchema as LabStaffCreateWithoutLabInvitationInputObjectSchema } from './LabStaffCreateWithoutLabInvitationInput.schema';
import { LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema as LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabInvitationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabInvitationInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema)])
}).strict();
export const LabStaffCreateOrConnectWithoutLabInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffCreateOrConnectWithoutLabInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateOrConnectWithoutLabInvitationInput>;
export const LabStaffCreateOrConnectWithoutLabInvitationInputObjectZodSchema = makeSchema();
