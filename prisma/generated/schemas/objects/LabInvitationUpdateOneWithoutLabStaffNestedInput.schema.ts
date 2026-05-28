import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationCreateWithoutLabStaffInputObjectSchema as LabInvitationCreateWithoutLabStaffInputObjectSchema } from './LabInvitationCreateWithoutLabStaffInput.schema';
import { LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema as LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabInvitationUncheckedCreateWithoutLabStaffInput.schema';
import { LabInvitationCreateOrConnectWithoutLabStaffInputObjectSchema as LabInvitationCreateOrConnectWithoutLabStaffInputObjectSchema } from './LabInvitationCreateOrConnectWithoutLabStaffInput.schema';
import { LabInvitationUpsertWithoutLabStaffInputObjectSchema as LabInvitationUpsertWithoutLabStaffInputObjectSchema } from './LabInvitationUpsertWithoutLabStaffInput.schema';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './LabInvitationWhereInput.schema';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './LabInvitationWhereUniqueInput.schema';
import { LabInvitationUpdateToOneWithWhereWithoutLabStaffInputObjectSchema as LabInvitationUpdateToOneWithWhereWithoutLabStaffInputObjectSchema } from './LabInvitationUpdateToOneWithWhereWithoutLabStaffInput.schema';
import { LabInvitationUpdateWithoutLabStaffInputObjectSchema as LabInvitationUpdateWithoutLabStaffInputObjectSchema } from './LabInvitationUpdateWithoutLabStaffInput.schema';
import { LabInvitationUncheckedUpdateWithoutLabStaffInputObjectSchema as LabInvitationUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabInvitationUncheckedUpdateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabInvitationCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabInvitationCreateOrConnectWithoutLabStaffInputObjectSchema).optional(),
  upsert: z.lazy(() => LabInvitationUpsertWithoutLabStaffInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabInvitationWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabInvitationWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabInvitationWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabInvitationUpdateToOneWithWhereWithoutLabStaffInputObjectSchema), z.lazy(() => LabInvitationUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabInvitationUncheckedUpdateWithoutLabStaffInputObjectSchema)]).optional()
}).strict();
export const LabInvitationUpdateOneWithoutLabStaffNestedInputObjectSchema: z.ZodType<Prisma.LabInvitationUpdateOneWithoutLabStaffNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUpdateOneWithoutLabStaffNestedInput>;
export const LabInvitationUpdateOneWithoutLabStaffNestedInputObjectZodSchema = makeSchema();
