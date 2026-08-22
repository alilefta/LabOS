import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateWithoutLabStaffIntentInputObjectSchema as InvitationCreateWithoutLabStaffIntentInputObjectSchema } from './InvitationCreateWithoutLabStaffIntentInput.schema';
import { InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema as InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema } from './InvitationUncheckedCreateWithoutLabStaffIntentInput.schema';
import { InvitationCreateOrConnectWithoutLabStaffIntentInputObjectSchema as InvitationCreateOrConnectWithoutLabStaffIntentInputObjectSchema } from './InvitationCreateOrConnectWithoutLabStaffIntentInput.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvitationCreateWithoutLabStaffIntentInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => InvitationCreateOrConnectWithoutLabStaffIntentInputObjectSchema).optional(),
  connect: z.lazy(() => InvitationWhereUniqueInputObjectSchema).optional()
}).strict();
export const InvitationCreateNestedOneWithoutLabStaffIntentInputObjectSchema: z.ZodType<Prisma.InvitationCreateNestedOneWithoutLabStaffIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateNestedOneWithoutLabStaffIntentInput>;
export const InvitationCreateNestedOneWithoutLabStaffIntentInputObjectZodSchema = makeSchema();
