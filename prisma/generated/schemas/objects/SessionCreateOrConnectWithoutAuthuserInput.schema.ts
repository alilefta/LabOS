import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionWhereUniqueInputObjectSchema as SessionWhereUniqueInputObjectSchema } from './SessionWhereUniqueInput.schema';
import { SessionCreateWithoutAuthuserInputObjectSchema as SessionCreateWithoutAuthuserInputObjectSchema } from './SessionCreateWithoutAuthuserInput.schema';
import { SessionUncheckedCreateWithoutAuthuserInputObjectSchema as SessionUncheckedCreateWithoutAuthuserInputObjectSchema } from './SessionUncheckedCreateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => SessionCreateWithoutAuthuserInputObjectSchema), z.lazy(() => SessionUncheckedCreateWithoutAuthuserInputObjectSchema)])
}).strict();
export const SessionCreateOrConnectWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionCreateOrConnectWithoutAuthuserInput>;
export const SessionCreateOrConnectWithoutAuthuserInputObjectZodSchema = makeSchema();
