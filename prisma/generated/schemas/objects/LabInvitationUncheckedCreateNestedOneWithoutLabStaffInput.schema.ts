import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationCreateWithoutLabStaffInputObjectSchema as LabInvitationCreateWithoutLabStaffInputObjectSchema } from './LabInvitationCreateWithoutLabStaffInput.schema';
import { LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema as LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabInvitationUncheckedCreateWithoutLabStaffInput.schema';
import { LabInvitationCreateOrConnectWithoutLabStaffInputObjectSchema as LabInvitationCreateOrConnectWithoutLabStaffInputObjectSchema } from './LabInvitationCreateOrConnectWithoutLabStaffInput.schema';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './LabInvitationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabInvitationCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabInvitationCreateOrConnectWithoutLabStaffInputObjectSchema).optional(),
  connect: z.lazy(() => LabInvitationWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabInvitationUncheckedCreateNestedOneWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabInvitationUncheckedCreateNestedOneWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUncheckedCreateNestedOneWithoutLabStaffInput>;
export const LabInvitationUncheckedCreateNestedOneWithoutLabStaffInputObjectZodSchema = makeSchema();
