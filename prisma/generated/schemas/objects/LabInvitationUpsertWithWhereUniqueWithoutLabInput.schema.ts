import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './LabInvitationWhereUniqueInput.schema';
import { LabInvitationUpdateWithoutLabInputObjectSchema as LabInvitationUpdateWithoutLabInputObjectSchema } from './LabInvitationUpdateWithoutLabInput.schema';
import { LabInvitationUncheckedUpdateWithoutLabInputObjectSchema as LabInvitationUncheckedUpdateWithoutLabInputObjectSchema } from './LabInvitationUncheckedUpdateWithoutLabInput.schema';
import { LabInvitationCreateWithoutLabInputObjectSchema as LabInvitationCreateWithoutLabInputObjectSchema } from './LabInvitationCreateWithoutLabInput.schema';
import { LabInvitationUncheckedCreateWithoutLabInputObjectSchema as LabInvitationUncheckedCreateWithoutLabInputObjectSchema } from './LabInvitationUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabInvitationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => LabInvitationUpdateWithoutLabInputObjectSchema), z.lazy(() => LabInvitationUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => LabInvitationCreateWithoutLabInputObjectSchema), z.lazy(() => LabInvitationUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const LabInvitationUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.LabInvitationUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUpsertWithWhereUniqueWithoutLabInput>;
export const LabInvitationUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
