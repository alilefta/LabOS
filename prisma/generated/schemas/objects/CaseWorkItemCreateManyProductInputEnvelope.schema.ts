import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateManyProductInputObjectSchema as CaseWorkItemCreateManyProductInputObjectSchema } from './CaseWorkItemCreateManyProductInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseWorkItemCreateManyProductInputObjectSchema), z.lazy(() => CaseWorkItemCreateManyProductInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseWorkItemCreateManyProductInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateManyProductInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateManyProductInputEnvelope>;
export const CaseWorkItemCreateManyProductInputEnvelopeObjectZodSchema = makeSchema();
