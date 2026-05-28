import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationScalarWhereInputObjectSchema as LabInvitationScalarWhereInputObjectSchema } from './LabInvitationScalarWhereInput.schema';
import { LabInvitationUpdateManyMutationInputObjectSchema as LabInvitationUpdateManyMutationInputObjectSchema } from './LabInvitationUpdateManyMutationInput.schema';
import { LabInvitationUncheckedUpdateManyWithoutLabInputObjectSchema as LabInvitationUncheckedUpdateManyWithoutLabInputObjectSchema } from './LabInvitationUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabInvitationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => LabInvitationUpdateManyMutationInputObjectSchema), z.lazy(() => LabInvitationUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const LabInvitationUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.LabInvitationUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUpdateManyWithWhereWithoutLabInput>;
export const LabInvitationUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
