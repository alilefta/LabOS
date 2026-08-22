import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentCreateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentUpsertWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUpsertWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUpsertWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './LabStaffInvitationIntentWhereInput.schema';
import { LabStaffInvitationIntentWhereUniqueInputObjectSchema as LabStaffInvitationIntentWhereUniqueInputObjectSchema } from './LabStaffInvitationIntentWhereUniqueInput.schema';
import { LabStaffInvitationIntentUpdateToOneWithWhereWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUpdateToOneWithWhereWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUpdateToOneWithWhereWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUpdateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInputObjectSchema).optional(),
  upsert: z.lazy(() => LabStaffInvitationIntentUpsertWithoutLabStaffInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabStaffInvitationIntentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabStaffInvitationIntentUpdateToOneWithWhereWithoutLabStaffInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInputObjectSchema)]).optional()
}).strict();
export const LabStaffInvitationIntentUncheckedUpdateOneWithoutLabStaffNestedInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUncheckedUpdateOneWithoutLabStaffNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUncheckedUpdateOneWithoutLabStaffNestedInput>;
export const LabStaffInvitationIntentUncheckedUpdateOneWithoutLabStaffNestedInputObjectZodSchema = makeSchema();
