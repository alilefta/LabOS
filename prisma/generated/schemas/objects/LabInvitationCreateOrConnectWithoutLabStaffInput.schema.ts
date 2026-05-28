import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './LabInvitationWhereUniqueInput.schema';
import { LabInvitationCreateWithoutLabStaffInputObjectSchema as LabInvitationCreateWithoutLabStaffInputObjectSchema } from './LabInvitationCreateWithoutLabStaffInput.schema';
import { LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema as LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabInvitationUncheckedCreateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabInvitationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabInvitationCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema)])
}).strict();
export const LabInvitationCreateOrConnectWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabInvitationCreateOrConnectWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationCreateOrConnectWithoutLabStaffInput>;
export const LabInvitationCreateOrConnectWithoutLabStaffInputObjectZodSchema = makeSchema();
