import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithoutAuthuserInputObjectSchema as MemberUpdateWithoutAuthuserInputObjectSchema } from './MemberUpdateWithoutAuthuserInput.schema';
import { MemberUncheckedUpdateWithoutAuthuserInputObjectSchema as MemberUncheckedUpdateWithoutAuthuserInputObjectSchema } from './MemberUncheckedUpdateWithoutAuthuserInput.schema';
import { MemberCreateWithoutAuthuserInputObjectSchema as MemberCreateWithoutAuthuserInputObjectSchema } from './MemberCreateWithoutAuthuserInput.schema';
import { MemberUncheckedCreateWithoutAuthuserInputObjectSchema as MemberUncheckedCreateWithoutAuthuserInputObjectSchema } from './MemberUncheckedCreateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MemberUpdateWithoutAuthuserInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutAuthuserInputObjectSchema)]),
  create: z.union([z.lazy(() => MemberCreateWithoutAuthuserInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutAuthuserInputObjectSchema)])
}).strict();
export const MemberUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutAuthuserInput>;
export const MemberUpsertWithWhereUniqueWithoutAuthuserInputObjectZodSchema = makeSchema();
