import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutLabInvitationInputObjectSchema as LabStaffCreateWithoutLabInvitationInputObjectSchema } from './LabStaffCreateWithoutLabInvitationInput.schema';
import { LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema as LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabInvitationInput.schema';
import { LabStaffCreateOrConnectWithoutLabInvitationInputObjectSchema as LabStaffCreateOrConnectWithoutLabInvitationInputObjectSchema } from './LabStaffCreateOrConnectWithoutLabInvitationInput.schema';
import { LabStaffUpsertWithoutLabInvitationInputObjectSchema as LabStaffUpsertWithoutLabInvitationInputObjectSchema } from './LabStaffUpsertWithoutLabInvitationInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffUpdateToOneWithWhereWithoutLabInvitationInputObjectSchema as LabStaffUpdateToOneWithWhereWithoutLabInvitationInputObjectSchema } from './LabStaffUpdateToOneWithWhereWithoutLabInvitationInput.schema';
import { LabStaffUpdateWithoutLabInvitationInputObjectSchema as LabStaffUpdateWithoutLabInvitationInputObjectSchema } from './LabStaffUpdateWithoutLabInvitationInput.schema';
import { LabStaffUncheckedUpdateWithoutLabInvitationInputObjectSchema as LabStaffUncheckedUpdateWithoutLabInvitationInputObjectSchema } from './LabStaffUncheckedUpdateWithoutLabInvitationInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabInvitationInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutLabInvitationInputObjectSchema).optional(),
  upsert: z.lazy(() => LabStaffUpsertWithoutLabInvitationInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabStaffUpdateToOneWithWhereWithoutLabInvitationInputObjectSchema), z.lazy(() => LabStaffUpdateWithoutLabInvitationInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutLabInvitationInputObjectSchema)]).optional()
}).strict();
export const LabStaffUpdateOneWithoutLabInvitationNestedInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateOneWithoutLabInvitationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateOneWithoutLabInvitationNestedInput>;
export const LabStaffUpdateOneWithoutLabInvitationNestedInputObjectZodSchema = makeSchema();
