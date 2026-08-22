import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberUpdateWithoutLabStaffInputObjectSchema as MemberUpdateWithoutLabStaffInputObjectSchema } from './MemberUpdateWithoutLabStaffInput.schema';
import { MemberUncheckedUpdateWithoutLabStaffInputObjectSchema as MemberUncheckedUpdateWithoutLabStaffInputObjectSchema } from './MemberUncheckedUpdateWithoutLabStaffInput.schema';
import { MemberCreateWithoutLabStaffInputObjectSchema as MemberCreateWithoutLabStaffInputObjectSchema } from './MemberCreateWithoutLabStaffInput.schema';
import { MemberUncheckedCreateWithoutLabStaffInputObjectSchema as MemberUncheckedCreateWithoutLabStaffInputObjectSchema } from './MemberUncheckedCreateWithoutLabStaffInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => MemberUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutLabStaffInputObjectSchema)]),
  create: z.union([z.lazy(() => MemberCreateWithoutLabStaffInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutLabStaffInputObjectSchema)]),
  where: z.lazy(() => MemberWhereInputObjectSchema).optional()
}).strict();
export const MemberUpsertWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.MemberUpsertWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpsertWithoutLabStaffInput>;
export const MemberUpsertWithoutLabStaffInputObjectZodSchema = makeSchema();
