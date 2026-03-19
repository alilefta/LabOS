import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionWhereUniqueInputObjectSchema as SessionWhereUniqueInputObjectSchema } from './SessionWhereUniqueInput.schema';
import { SessionUpdateWithoutAuthuserInputObjectSchema as SessionUpdateWithoutAuthuserInputObjectSchema } from './SessionUpdateWithoutAuthuserInput.schema';
import { SessionUncheckedUpdateWithoutAuthuserInputObjectSchema as SessionUncheckedUpdateWithoutAuthuserInputObjectSchema } from './SessionUncheckedUpdateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SessionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => SessionUpdateWithoutAuthuserInputObjectSchema), z.lazy(() => SessionUncheckedUpdateWithoutAuthuserInputObjectSchema)])
}).strict();
export const SessionUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutAuthuserInput>;
export const SessionUpdateWithWhereUniqueWithoutAuthuserInputObjectZodSchema = makeSchema();
