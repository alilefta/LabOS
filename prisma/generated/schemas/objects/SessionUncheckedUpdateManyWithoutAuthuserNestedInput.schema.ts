import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionCreateWithoutAuthuserInputObjectSchema as SessionCreateWithoutAuthuserInputObjectSchema } from './SessionCreateWithoutAuthuserInput.schema';
import { SessionUncheckedCreateWithoutAuthuserInputObjectSchema as SessionUncheckedCreateWithoutAuthuserInputObjectSchema } from './SessionUncheckedCreateWithoutAuthuserInput.schema';
import { SessionCreateOrConnectWithoutAuthuserInputObjectSchema as SessionCreateOrConnectWithoutAuthuserInputObjectSchema } from './SessionCreateOrConnectWithoutAuthuserInput.schema';
import { SessionUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema as SessionUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema } from './SessionUpsertWithWhereUniqueWithoutAuthuserInput.schema';
import { SessionCreateManyAuthuserInputEnvelopeObjectSchema as SessionCreateManyAuthuserInputEnvelopeObjectSchema } from './SessionCreateManyAuthuserInputEnvelope.schema';
import { SessionWhereUniqueInputObjectSchema as SessionWhereUniqueInputObjectSchema } from './SessionWhereUniqueInput.schema';
import { SessionUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema as SessionUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema } from './SessionUpdateWithWhereUniqueWithoutAuthuserInput.schema';
import { SessionUpdateManyWithWhereWithoutAuthuserInputObjectSchema as SessionUpdateManyWithWhereWithoutAuthuserInputObjectSchema } from './SessionUpdateManyWithWhereWithoutAuthuserInput.schema';
import { SessionScalarWhereInputObjectSchema as SessionScalarWhereInputObjectSchema } from './SessionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutAuthuserInputObjectSchema), z.lazy(() => SessionCreateWithoutAuthuserInputObjectSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutAuthuserInputObjectSchema), z.lazy(() => SessionUncheckedCreateWithoutAuthuserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutAuthuserInputObjectSchema), z.lazy(() => SessionCreateOrConnectWithoutAuthuserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SessionUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyAuthuserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => SessionWhereUniqueInputObjectSchema), z.lazy(() => SessionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SessionWhereUniqueInputObjectSchema), z.lazy(() => SessionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SessionWhereUniqueInputObjectSchema), z.lazy(() => SessionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputObjectSchema), z.lazy(() => SessionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => SessionUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SessionUpdateManyWithWhereWithoutAuthuserInputObjectSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutAuthuserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SessionScalarWhereInputObjectSchema), z.lazy(() => SessionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const SessionUncheckedUpdateManyWithoutAuthuserNestedInputObjectSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutAuthuserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutAuthuserNestedInput>;
export const SessionUncheckedUpdateManyWithoutAuthuserNestedInputObjectZodSchema = makeSchema();
