import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './LabInvitationWhereUniqueInput.schema';
import { LabInvitationCreateWithoutLabInputObjectSchema as LabInvitationCreateWithoutLabInputObjectSchema } from './LabInvitationCreateWithoutLabInput.schema';
import { LabInvitationUncheckedCreateWithoutLabInputObjectSchema as LabInvitationUncheckedCreateWithoutLabInputObjectSchema } from './LabInvitationUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabInvitationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabInvitationCreateWithoutLabInputObjectSchema), z.lazy(() => LabInvitationUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const LabInvitationCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.LabInvitationCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationCreateOrConnectWithoutLabInput>;
export const LabInvitationCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
