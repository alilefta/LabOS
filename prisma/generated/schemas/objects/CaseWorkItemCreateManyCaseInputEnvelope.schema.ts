import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateManyCaseInputObjectSchema as CaseWorkItemCreateManyCaseInputObjectSchema } from './CaseWorkItemCreateManyCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseWorkItemCreateManyCaseInputObjectSchema), z.lazy(() => CaseWorkItemCreateManyCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseWorkItemCreateManyCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateManyCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateManyCaseInputEnvelope>;
export const CaseWorkItemCreateManyCaseInputEnvelopeObjectZodSchema = makeSchema();
