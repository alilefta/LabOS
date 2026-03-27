import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateManyDentistInputObjectSchema as CaseCreateManyDentistInputObjectSchema } from './CaseCreateManyDentistInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseCreateManyDentistInputObjectSchema), z.lazy(() => CaseCreateManyDentistInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseCreateManyDentistInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseCreateManyDentistInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManyDentistInputEnvelope>;
export const CaseCreateManyDentistInputEnvelopeObjectZodSchema = makeSchema();
