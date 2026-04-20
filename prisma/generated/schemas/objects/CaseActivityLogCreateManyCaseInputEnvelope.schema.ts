import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateManyCaseInputObjectSchema as CaseActivityLogCreateManyCaseInputObjectSchema } from './CaseActivityLogCreateManyCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseActivityLogCreateManyCaseInputObjectSchema), z.lazy(() => CaseActivityLogCreateManyCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseActivityLogCreateManyCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateManyCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateManyCaseInputEnvelope>;
export const CaseActivityLogCreateManyCaseInputEnvelopeObjectZodSchema = makeSchema();
