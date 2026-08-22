import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentWhereUniqueInputObjectSchema as LabStaffInvitationIntentWhereUniqueInputObjectSchema } from './LabStaffInvitationIntentWhereUniqueInput.schema';
import { LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentCreateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUncheckedCreateWithoutInvitationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffInvitationIntentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema)])
}).strict();
export const LabStaffInvitationIntentCreateOrConnectWithoutInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentCreateOrConnectWithoutInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCreateOrConnectWithoutInvitationInput>;
export const LabStaffInvitationIntentCreateOrConnectWithoutInvitationInputObjectZodSchema = makeSchema();
