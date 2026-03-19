import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionWhereUniqueInputObjectSchema as SessionWhereUniqueInputObjectSchema } from './SessionWhereUniqueInput.schema';
import { SessionUpdateWithoutAuthuserInputObjectSchema as SessionUpdateWithoutAuthuserInputObjectSchema } from './SessionUpdateWithoutAuthuserInput.schema';
import { SessionUncheckedUpdateWithoutAuthuserInputObjectSchema as SessionUncheckedUpdateWithoutAuthuserInputObjectSchema } from './SessionUncheckedUpdateWithoutAuthuserInput.schema';
import { SessionCreateWithoutAuthuserInputObjectSchema as SessionCreateWithoutAuthuserInputObjectSchema } from './SessionCreateWithoutAuthuserInput.schema';
import { SessionUncheckedCreateWithoutAuthuserInputObjectSchema as SessionUncheckedCreateWithoutAuthuserInputObjectSchema } from './SessionUncheckedCreateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SessionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => SessionUpdateWithoutAuthuserInputObjectSchema), z.lazy(() => SessionUncheckedUpdateWithoutAuthuserInputObjectSchema)]),
  create: z.union([z.lazy(() => SessionCreateWithoutAuthuserInputObjectSchema), z.lazy(() => SessionUncheckedCreateWithoutAuthuserInputObjectSchema)])
}).strict();
export const SessionUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutAuthuserInput>;
export const SessionUpsertWithWhereUniqueWithoutAuthuserInputObjectZodSchema = makeSchema();
