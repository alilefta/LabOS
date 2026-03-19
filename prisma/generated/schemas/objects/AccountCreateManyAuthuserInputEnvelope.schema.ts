import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AccountCreateManyAuthuserInputObjectSchema as AccountCreateManyAuthuserInputObjectSchema } from './AccountCreateManyAuthuserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AccountCreateManyAuthuserInputObjectSchema), z.lazy(() => AccountCreateManyAuthuserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AccountCreateManyAuthuserInputEnvelopeObjectSchema: z.ZodType<Prisma.AccountCreateManyAuthuserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AccountCreateManyAuthuserInputEnvelope>;
export const AccountCreateManyAuthuserInputEnvelopeObjectZodSchema = makeSchema();
