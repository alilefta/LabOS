import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateManyWorkTypeInputObjectSchema as CaseWorkItemCreateManyWorkTypeInputObjectSchema } from './CaseWorkItemCreateManyWorkTypeInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseWorkItemCreateManyWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemCreateManyWorkTypeInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseWorkItemCreateManyWorkTypeInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateManyWorkTypeInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateManyWorkTypeInputEnvelope>;
export const CaseWorkItemCreateManyWorkTypeInputEnvelopeObjectZodSchema = makeSchema();
