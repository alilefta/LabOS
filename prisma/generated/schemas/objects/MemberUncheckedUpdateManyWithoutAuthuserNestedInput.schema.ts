import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutAuthuserInputObjectSchema as MemberCreateWithoutAuthuserInputObjectSchema } from './MemberCreateWithoutAuthuserInput.schema';
import { MemberUncheckedCreateWithoutAuthuserInputObjectSchema as MemberUncheckedCreateWithoutAuthuserInputObjectSchema } from './MemberUncheckedCreateWithoutAuthuserInput.schema';
import { MemberCreateOrConnectWithoutAuthuserInputObjectSchema as MemberCreateOrConnectWithoutAuthuserInputObjectSchema } from './MemberCreateOrConnectWithoutAuthuserInput.schema';
import { MemberUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema as MemberUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema } from './MemberUpsertWithWhereUniqueWithoutAuthuserInput.schema';
import { MemberCreateManyAuthuserInputEnvelopeObjectSchema as MemberCreateManyAuthuserInputEnvelopeObjectSchema } from './MemberCreateManyAuthuserInputEnvelope.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema as MemberUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema } from './MemberUpdateWithWhereUniqueWithoutAuthuserInput.schema';
import { MemberUpdateManyWithWhereWithoutAuthuserInputObjectSchema as MemberUpdateManyWithWhereWithoutAuthuserInputObjectSchema } from './MemberUpdateManyWithWhereWithoutAuthuserInput.schema';
import { MemberScalarWhereInputObjectSchema as MemberScalarWhereInputObjectSchema } from './MemberScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutAuthuserInputObjectSchema), z.lazy(() => MemberCreateWithoutAuthuserInputObjectSchema).array(), z.lazy(() => MemberUncheckedCreateWithoutAuthuserInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutAuthuserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MemberCreateOrConnectWithoutAuthuserInputObjectSchema), z.lazy(() => MemberCreateOrConnectWithoutAuthuserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MemberUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema), z.lazy(() => MemberUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MemberCreateManyAuthuserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MemberUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema), z.lazy(() => MemberUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MemberUpdateManyWithWhereWithoutAuthuserInputObjectSchema), z.lazy(() => MemberUpdateManyWithWhereWithoutAuthuserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MemberScalarWhereInputObjectSchema), z.lazy(() => MemberScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MemberUncheckedUpdateManyWithoutAuthuserNestedInputObjectSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutAuthuserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutAuthuserNestedInput>;
export const MemberUncheckedUpdateManyWithoutAuthuserNestedInputObjectZodSchema = makeSchema();
