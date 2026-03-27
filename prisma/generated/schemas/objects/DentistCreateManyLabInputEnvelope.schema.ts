import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistCreateManyLabInputObjectSchema as DentistCreateManyLabInputObjectSchema } from './DentistCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => DentistCreateManyLabInputObjectSchema), z.lazy(() => DentistCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const DentistCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.DentistCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateManyLabInputEnvelope>;
export const DentistCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
