import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './LabInvitationWhereUniqueInput.schema';
import { LabInvitationUpdateWithoutLabInputObjectSchema as LabInvitationUpdateWithoutLabInputObjectSchema } from './LabInvitationUpdateWithoutLabInput.schema';
import { LabInvitationUncheckedUpdateWithoutLabInputObjectSchema as LabInvitationUncheckedUpdateWithoutLabInputObjectSchema } from './LabInvitationUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabInvitationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => LabInvitationUpdateWithoutLabInputObjectSchema), z.lazy(() => LabInvitationUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const LabInvitationUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.LabInvitationUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUpdateWithWhereUniqueWithoutLabInput>;
export const LabInvitationUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
