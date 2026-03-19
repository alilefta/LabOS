import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionCreateWithoutAuthuserInputObjectSchema as SessionCreateWithoutAuthuserInputObjectSchema } from './SessionCreateWithoutAuthuserInput.schema';
import { SessionUncheckedCreateWithoutAuthuserInputObjectSchema as SessionUncheckedCreateWithoutAuthuserInputObjectSchema } from './SessionUncheckedCreateWithoutAuthuserInput.schema';
import { SessionCreateOrConnectWithoutAuthuserInputObjectSchema as SessionCreateOrConnectWithoutAuthuserInputObjectSchema } from './SessionCreateOrConnectWithoutAuthuserInput.schema';
import { SessionCreateManyAuthuserInputEnvelopeObjectSchema as SessionCreateManyAuthuserInputEnvelopeObjectSchema } from './SessionCreateManyAuthuserInputEnvelope.schema';
import { SessionWhereUniqueInputObjectSchema as SessionWhereUniqueInputObjectSchema } from './SessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutAuthuserInputObjectSchema), z.lazy(() => SessionCreateWithoutAuthuserInputObjectSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutAuthuserInputObjectSchema), z.lazy(() => SessionUncheckedCreateWithoutAuthuserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutAuthuserInputObjectSchema), z.lazy(() => SessionCreateOrConnectWithoutAuthuserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyAuthuserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputObjectSchema), z.lazy(() => SessionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutAuthuserInput>;
export const SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectZodSchema = makeSchema();
