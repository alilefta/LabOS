import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateManyLabInputObjectSchema as ClinicCreateManyLabInputObjectSchema } from './ClinicCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ClinicCreateManyLabInputObjectSchema), z.lazy(() => ClinicCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ClinicCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.ClinicCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateManyLabInputEnvelope>;
export const ClinicCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
