import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateManySalesRepsInputObjectSchema as CaseCreateManySalesRepsInputObjectSchema } from './CaseCreateManySalesRepsInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseCreateManySalesRepsInputObjectSchema), z.lazy(() => CaseCreateManySalesRepsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseCreateManySalesRepsInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseCreateManySalesRepsInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManySalesRepsInputEnvelope>;
export const CaseCreateManySalesRepsInputEnvelopeObjectZodSchema = makeSchema();
