import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentCreateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUncheckedCreateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentCreateOrConnectWithoutInvitationInputObjectSchema as LabStaffInvitationIntentCreateOrConnectWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentCreateOrConnectWithoutInvitationInput.schema';
import { LabStaffInvitationIntentUpsertWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUpsertWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUpsertWithoutInvitationInput.schema';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './LabStaffInvitationIntentWhereInput.schema';
import { LabStaffInvitationIntentWhereUniqueInputObjectSchema as LabStaffInvitationIntentWhereUniqueInputObjectSchema } from './LabStaffInvitationIntentWhereUniqueInput.schema';
import { LabStaffInvitationIntentUpdateToOneWithWhereWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUpdateToOneWithWhereWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUpdateToOneWithWhereWithoutInvitationInput.schema';
import { LabStaffInvitationIntentUpdateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUpdateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUpdateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffInvitationIntentCreateOrConnectWithoutInvitationInputObjectSchema).optional(),
  upsert: z.lazy(() => LabStaffInvitationIntentUpsertWithoutInvitationInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabStaffInvitationIntentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabStaffInvitationIntentUpdateToOneWithWhereWithoutInvitationInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUpdateWithoutInvitationInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInputObjectSchema)]).optional()
}).strict();
export const LabStaffInvitationIntentUpdateOneWithoutInvitationNestedInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUpdateOneWithoutInvitationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUpdateOneWithoutInvitationNestedInput>;
export const LabStaffInvitationIntentUpdateOneWithoutInvitationNestedInputObjectZodSchema = makeSchema();
