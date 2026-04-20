import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateManyLabInputObjectSchema as CaseActivityLogCreateManyLabInputObjectSchema } from './CaseActivityLogCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseActivityLogCreateManyLabInputObjectSchema), z.lazy(() => CaseActivityLogCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseActivityLogCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateManyLabInputEnvelope>;
export const CaseActivityLogCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
