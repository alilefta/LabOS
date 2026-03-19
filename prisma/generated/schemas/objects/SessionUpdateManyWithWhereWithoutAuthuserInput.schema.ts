import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionScalarWhereInputObjectSchema as SessionScalarWhereInputObjectSchema } from './SessionScalarWhereInput.schema';
import { SessionUpdateManyMutationInputObjectSchema as SessionUpdateManyMutationInputObjectSchema } from './SessionUpdateManyMutationInput.schema';
import { SessionUncheckedUpdateManyWithoutAuthuserInputObjectSchema as SessionUncheckedUpdateManyWithoutAuthuserInputObjectSchema } from './SessionUncheckedUpdateManyWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SessionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => SessionUpdateManyMutationInputObjectSchema), z.lazy(() => SessionUncheckedUpdateManyWithoutAuthuserInputObjectSchema)])
}).strict();
export const SessionUpdateManyWithWhereWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutAuthuserInput>;
export const SessionUpdateManyWithWhereWithoutAuthuserInputObjectZodSchema = makeSchema();
