import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutLabStaffInputObjectSchema as MemberCreateWithoutLabStaffInputObjectSchema } from './MemberCreateWithoutLabStaffInput.schema';
import { MemberUncheckedCreateWithoutLabStaffInputObjectSchema as MemberUncheckedCreateWithoutLabStaffInputObjectSchema } from './MemberUncheckedCreateWithoutLabStaffInput.schema';
import { MemberCreateOrConnectWithoutLabStaffInputObjectSchema as MemberCreateOrConnectWithoutLabStaffInputObjectSchema } from './MemberCreateOrConnectWithoutLabStaffInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutLabStaffInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutLabStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutLabStaffInputObjectSchema).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputObjectSchema).optional()
}).strict();
export const MemberCreateNestedOneWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.MemberCreateNestedOneWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateNestedOneWithoutLabStaffInput>;
export const MemberCreateNestedOneWithoutLabStaffInputObjectZodSchema = makeSchema();
