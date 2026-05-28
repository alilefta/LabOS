import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutLabInvitationInputObjectSchema as LabStaffCreateWithoutLabInvitationInputObjectSchema } from './LabStaffCreateWithoutLabInvitationInput.schema';
import { LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema as LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabInvitationInput.schema';
import { LabStaffCreateOrConnectWithoutLabInvitationInputObjectSchema as LabStaffCreateOrConnectWithoutLabInvitationInputObjectSchema } from './LabStaffCreateOrConnectWithoutLabInvitationInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabInvitationInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutLabInvitationInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffCreateNestedOneWithoutLabInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffCreateNestedOneWithoutLabInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateNestedOneWithoutLabInvitationInput>;
export const LabStaffCreateNestedOneWithoutLabInvitationInputObjectZodSchema = makeSchema();
