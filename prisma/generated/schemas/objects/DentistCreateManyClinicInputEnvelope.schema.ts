import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistCreateManyClinicInputObjectSchema as DentistCreateManyClinicInputObjectSchema } from './DentistCreateManyClinicInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => DentistCreateManyClinicInputObjectSchema), z.lazy(() => DentistCreateManyClinicInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const DentistCreateManyClinicInputEnvelopeObjectSchema: z.ZodType<Prisma.DentistCreateManyClinicInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateManyClinicInputEnvelope>;
export const DentistCreateManyClinicInputEnvelopeObjectZodSchema = makeSchema();
