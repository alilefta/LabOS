import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberCreateWithoutLabStaffInputObjectSchema as MemberCreateWithoutLabStaffInputObjectSchema } from './MemberCreateWithoutLabStaffInput.schema';
import { MemberUncheckedCreateWithoutLabStaffInputObjectSchema as MemberUncheckedCreateWithoutLabStaffInputObjectSchema } from './MemberUncheckedCreateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MemberCreateWithoutLabStaffInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutLabStaffInputObjectSchema)])
}).strict();
export const MemberCreateOrConnectWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateOrConnectWithoutLabStaffInput>;
export const MemberCreateOrConnectWithoutLabStaffInputObjectZodSchema = makeSchema();
