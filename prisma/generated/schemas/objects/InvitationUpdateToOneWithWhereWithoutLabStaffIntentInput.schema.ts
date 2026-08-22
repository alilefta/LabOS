import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './InvitationWhereInput.schema';
import { InvitationUpdateWithoutLabStaffIntentInputObjectSchema as InvitationUpdateWithoutLabStaffIntentInputObjectSchema } from './InvitationUpdateWithoutLabStaffIntentInput.schema';
import { InvitationUncheckedUpdateWithoutLabStaffIntentInputObjectSchema as InvitationUncheckedUpdateWithoutLabStaffIntentInputObjectSchema } from './InvitationUncheckedUpdateWithoutLabStaffIntentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => InvitationUpdateWithoutLabStaffIntentInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutLabStaffIntentInputObjectSchema)])
}).strict();
export const InvitationUpdateToOneWithWhereWithoutLabStaffIntentInputObjectSchema: z.ZodType<Prisma.InvitationUpdateToOneWithWhereWithoutLabStaffIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateToOneWithWhereWithoutLabStaffIntentInput>;
export const InvitationUpdateToOneWithWhereWithoutLabStaffIntentInputObjectZodSchema = makeSchema();
