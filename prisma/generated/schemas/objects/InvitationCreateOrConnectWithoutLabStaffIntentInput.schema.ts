import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationCreateWithoutLabStaffIntentInputObjectSchema as InvitationCreateWithoutLabStaffIntentInputObjectSchema } from './InvitationCreateWithoutLabStaffIntentInput.schema';
import { InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema as InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema } from './InvitationUncheckedCreateWithoutLabStaffIntentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvitationCreateWithoutLabStaffIntentInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema)])
}).strict();
export const InvitationCreateOrConnectWithoutLabStaffIntentInputObjectSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutLabStaffIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateOrConnectWithoutLabStaffIntentInput>;
export const InvitationCreateOrConnectWithoutLabStaffIntentInputObjectZodSchema = makeSchema();
