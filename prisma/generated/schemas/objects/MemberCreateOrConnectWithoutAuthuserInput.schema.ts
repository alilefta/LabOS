import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberCreateWithoutAuthuserInputObjectSchema as MemberCreateWithoutAuthuserInputObjectSchema } from './MemberCreateWithoutAuthuserInput.schema';
import { MemberUncheckedCreateWithoutAuthuserInputObjectSchema as MemberUncheckedCreateWithoutAuthuserInputObjectSchema } from './MemberUncheckedCreateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MemberCreateWithoutAuthuserInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutAuthuserInputObjectSchema)])
}).strict();
export const MemberCreateOrConnectWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateOrConnectWithoutAuthuserInput>;
export const MemberCreateOrConnectWithoutAuthuserInputObjectZodSchema = makeSchema();
