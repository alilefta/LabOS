import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentCreateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUncheckedCreateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentCreateOrConnectWithoutInvitationInputObjectSchema as LabStaffInvitationIntentCreateOrConnectWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentCreateOrConnectWithoutInvitationInput.schema';
import { LabStaffInvitationIntentWhereUniqueInputObjectSchema as LabStaffInvitationIntentWhereUniqueInputObjectSchema } from './LabStaffInvitationIntentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffInvitationIntentCreateOrConnectWithoutInvitationInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffInvitationIntentWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffInvitationIntentCreateNestedOneWithoutInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentCreateNestedOneWithoutInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCreateNestedOneWithoutInvitationInput>;
export const LabStaffInvitationIntentCreateNestedOneWithoutInvitationInputObjectZodSchema = makeSchema();
