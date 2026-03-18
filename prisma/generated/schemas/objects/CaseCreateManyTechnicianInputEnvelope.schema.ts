import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateManyTechnicianInputObjectSchema as CaseCreateManyTechnicianInputObjectSchema } from './CaseCreateManyTechnicianInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseCreateManyTechnicianInputObjectSchema), z.lazy(() => CaseCreateManyTechnicianInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseCreateManyTechnicianInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseCreateManyTechnicianInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManyTechnicianInputEnvelope>;
export const CaseCreateManyTechnicianInputEnvelopeObjectZodSchema = makeSchema();
