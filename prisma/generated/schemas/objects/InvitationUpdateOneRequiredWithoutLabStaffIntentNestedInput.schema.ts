import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateWithoutLabStaffIntentInputObjectSchema as InvitationCreateWithoutLabStaffIntentInputObjectSchema } from './InvitationCreateWithoutLabStaffIntentInput.schema';
import { InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema as InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema } from './InvitationUncheckedCreateWithoutLabStaffIntentInput.schema';
import { InvitationCreateOrConnectWithoutLabStaffIntentInputObjectSchema as InvitationCreateOrConnectWithoutLabStaffIntentInputObjectSchema } from './InvitationCreateOrConnectWithoutLabStaffIntentInput.schema';
import { InvitationUpsertWithoutLabStaffIntentInputObjectSchema as InvitationUpsertWithoutLabStaffIntentInputObjectSchema } from './InvitationUpsertWithoutLabStaffIntentInput.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateToOneWithWhereWithoutLabStaffIntentInputObjectSchema as InvitationUpdateToOneWithWhereWithoutLabStaffIntentInputObjectSchema } from './InvitationUpdateToOneWithWhereWithoutLabStaffIntentInput.schema';
import { InvitationUpdateWithoutLabStaffIntentInputObjectSchema as InvitationUpdateWithoutLabStaffIntentInputObjectSchema } from './InvitationUpdateWithoutLabStaffIntentInput.schema';
import { InvitationUncheckedUpdateWithoutLabStaffIntentInputObjectSchema as InvitationUncheckedUpdateWithoutLabStaffIntentInputObjectSchema } from './InvitationUncheckedUpdateWithoutLabStaffIntentInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvitationCreateWithoutLabStaffIntentInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => InvitationCreateOrConnectWithoutLabStaffIntentInputObjectSchema).optional(),
  upsert: z.lazy(() => InvitationUpsertWithoutLabStaffIntentInputObjectSchema).optional(),
  connect: z.lazy(() => InvitationWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => InvitationUpdateToOneWithWhereWithoutLabStaffIntentInputObjectSchema), z.lazy(() => InvitationUpdateWithoutLabStaffIntentInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutLabStaffIntentInputObjectSchema)]).optional()
}).strict();
export const InvitationUpdateOneRequiredWithoutLabStaffIntentNestedInputObjectSchema: z.ZodType<Prisma.InvitationUpdateOneRequiredWithoutLabStaffIntentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateOneRequiredWithoutLabStaffIntentNestedInput>;
export const InvitationUpdateOneRequiredWithoutLabStaffIntentNestedInputObjectZodSchema = makeSchema();
