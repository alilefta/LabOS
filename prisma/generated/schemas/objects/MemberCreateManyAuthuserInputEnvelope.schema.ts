import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateManyAuthuserInputObjectSchema as MemberCreateManyAuthuserInputObjectSchema } from './MemberCreateManyAuthuserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => MemberCreateManyAuthuserInputObjectSchema), z.lazy(() => MemberCreateManyAuthuserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MemberCreateManyAuthuserInputEnvelopeObjectSchema: z.ZodType<Prisma.MemberCreateManyAuthuserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateManyAuthuserInputEnvelope>;
export const MemberCreateManyAuthuserInputEnvelopeObjectZodSchema = makeSchema();
