import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateManyLabInputObjectSchema as CaseWorkItemCreateManyLabInputObjectSchema } from './CaseWorkItemCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseWorkItemCreateManyLabInputObjectSchema), z.lazy(() => CaseWorkItemCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseWorkItemCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateManyLabInputEnvelope>;
export const CaseWorkItemCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
