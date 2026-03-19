import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionCreateManyAuthuserInputObjectSchema as SessionCreateManyAuthuserInputObjectSchema } from './SessionCreateManyAuthuserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => SessionCreateManyAuthuserInputObjectSchema), z.lazy(() => SessionCreateManyAuthuserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const SessionCreateManyAuthuserInputEnvelopeObjectSchema: z.ZodType<Prisma.SessionCreateManyAuthuserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.SessionCreateManyAuthuserInputEnvelope>;
export const SessionCreateManyAuthuserInputEnvelopeObjectZodSchema = makeSchema();
