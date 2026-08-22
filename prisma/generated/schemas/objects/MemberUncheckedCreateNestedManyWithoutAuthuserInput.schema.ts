import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutAuthuserInputObjectSchema as MemberCreateWithoutAuthuserInputObjectSchema } from './MemberCreateWithoutAuthuserInput.schema';
import { MemberUncheckedCreateWithoutAuthuserInputObjectSchema as MemberUncheckedCreateWithoutAuthuserInputObjectSchema } from './MemberUncheckedCreateWithoutAuthuserInput.schema';
import { MemberCreateOrConnectWithoutAuthuserInputObjectSchema as MemberCreateOrConnectWithoutAuthuserInputObjectSchema } from './MemberCreateOrConnectWithoutAuthuserInput.schema';
import { MemberCreateManyAuthuserInputEnvelopeObjectSchema as MemberCreateManyAuthuserInputEnvelopeObjectSchema } from './MemberCreateManyAuthuserInputEnvelope.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutAuthuserInputObjectSchema), z.lazy(() => MemberCreateWithoutAuthuserInputObjectSchema).array(), z.lazy(() => MemberUncheckedCreateWithoutAuthuserInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutAuthuserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MemberCreateOrConnectWithoutAuthuserInputObjectSchema), z.lazy(() => MemberCreateOrConnectWithoutAuthuserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MemberCreateManyAuthuserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MemberUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutAuthuserInput>;
export const MemberUncheckedCreateNestedManyWithoutAuthuserInputObjectZodSchema = makeSchema();
