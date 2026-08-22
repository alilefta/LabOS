import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateManyAuthuserInputObjectSchema as InvitationCreateManyAuthuserInputObjectSchema } from './InvitationCreateManyAuthuserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InvitationCreateManyAuthuserInputObjectSchema), z.lazy(() => InvitationCreateManyAuthuserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InvitationCreateManyAuthuserInputEnvelopeObjectSchema: z.ZodType<Prisma.InvitationCreateManyAuthuserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateManyAuthuserInputEnvelope>;
export const InvitationCreateManyAuthuserInputEnvelopeObjectZodSchema = makeSchema();
