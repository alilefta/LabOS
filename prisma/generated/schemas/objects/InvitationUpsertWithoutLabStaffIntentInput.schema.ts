import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationUpdateWithoutLabStaffIntentInputObjectSchema as InvitationUpdateWithoutLabStaffIntentInputObjectSchema } from './InvitationUpdateWithoutLabStaffIntentInput.schema';
import { InvitationUncheckedUpdateWithoutLabStaffIntentInputObjectSchema as InvitationUncheckedUpdateWithoutLabStaffIntentInputObjectSchema } from './InvitationUncheckedUpdateWithoutLabStaffIntentInput.schema';
import { InvitationCreateWithoutLabStaffIntentInputObjectSchema as InvitationCreateWithoutLabStaffIntentInputObjectSchema } from './InvitationCreateWithoutLabStaffIntentInput.schema';
import { InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema as InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema } from './InvitationUncheckedCreateWithoutLabStaffIntentInput.schema';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './InvitationWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => InvitationUpdateWithoutLabStaffIntentInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutLabStaffIntentInputObjectSchema)]),
  create: z.union([z.lazy(() => InvitationCreateWithoutLabStaffIntentInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema)]),
  where: z.lazy(() => InvitationWhereInputObjectSchema).optional()
}).strict();
export const InvitationUpsertWithoutLabStaffIntentInputObjectSchema: z.ZodType<Prisma.InvitationUpsertWithoutLabStaffIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpsertWithoutLabStaffIntentInput>;
export const InvitationUpsertWithoutLabStaffIntentInputObjectZodSchema = makeSchema();
