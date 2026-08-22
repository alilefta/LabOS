import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { MemberUpdateWithoutLabStaffInputObjectSchema as MemberUpdateWithoutLabStaffInputObjectSchema } from './MemberUpdateWithoutLabStaffInput.schema';
import { MemberUncheckedUpdateWithoutLabStaffInputObjectSchema as MemberUncheckedUpdateWithoutLabStaffInputObjectSchema } from './MemberUncheckedUpdateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => MemberUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutLabStaffInputObjectSchema)])
}).strict();
export const MemberUpdateToOneWithWhereWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutLabStaffInput>;
export const MemberUpdateToOneWithWhereWithoutLabStaffInputObjectZodSchema = makeSchema();
