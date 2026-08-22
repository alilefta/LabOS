import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithoutAuthuserInputObjectSchema as MemberUpdateWithoutAuthuserInputObjectSchema } from './MemberUpdateWithoutAuthuserInput.schema';
import { MemberUncheckedUpdateWithoutAuthuserInputObjectSchema as MemberUncheckedUpdateWithoutAuthuserInputObjectSchema } from './MemberUncheckedUpdateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MemberUpdateWithoutAuthuserInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutAuthuserInputObjectSchema)])
}).strict();
export const MemberUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutAuthuserInput>;
export const MemberUpdateWithWhereUniqueWithoutAuthuserInputObjectZodSchema = makeSchema();
