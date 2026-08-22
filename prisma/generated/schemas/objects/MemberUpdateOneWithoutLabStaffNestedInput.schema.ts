import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutLabStaffInputObjectSchema as MemberCreateWithoutLabStaffInputObjectSchema } from './MemberCreateWithoutLabStaffInput.schema';
import { MemberUncheckedCreateWithoutLabStaffInputObjectSchema as MemberUncheckedCreateWithoutLabStaffInputObjectSchema } from './MemberUncheckedCreateWithoutLabStaffInput.schema';
import { MemberCreateOrConnectWithoutLabStaffInputObjectSchema as MemberCreateOrConnectWithoutLabStaffInputObjectSchema } from './MemberCreateOrConnectWithoutLabStaffInput.schema';
import { MemberUpsertWithoutLabStaffInputObjectSchema as MemberUpsertWithoutLabStaffInputObjectSchema } from './MemberUpsertWithoutLabStaffInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateToOneWithWhereWithoutLabStaffInputObjectSchema as MemberUpdateToOneWithWhereWithoutLabStaffInputObjectSchema } from './MemberUpdateToOneWithWhereWithoutLabStaffInput.schema';
import { MemberUpdateWithoutLabStaffInputObjectSchema as MemberUpdateWithoutLabStaffInputObjectSchema } from './MemberUpdateWithoutLabStaffInput.schema';
import { MemberUncheckedUpdateWithoutLabStaffInputObjectSchema as MemberUncheckedUpdateWithoutLabStaffInputObjectSchema } from './MemberUncheckedUpdateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutLabStaffInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutLabStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutLabStaffInputObjectSchema).optional(),
  upsert: z.lazy(() => MemberUpsertWithoutLabStaffInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => MemberUpdateToOneWithWhereWithoutLabStaffInputObjectSchema), z.lazy(() => MemberUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutLabStaffInputObjectSchema)]).optional()
}).strict();
export const MemberUpdateOneWithoutLabStaffNestedInputObjectSchema: z.ZodType<Prisma.MemberUpdateOneWithoutLabStaffNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateOneWithoutLabStaffNestedInput>;
export const MemberUpdateOneWithoutLabStaffNestedInputObjectZodSchema = makeSchema();
