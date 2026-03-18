import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianCreateManyLabInputObjectSchema as TechnicianCreateManyLabInputObjectSchema } from './TechnicianCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => TechnicianCreateManyLabInputObjectSchema), z.lazy(() => TechnicianCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const TechnicianCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.TechnicianCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianCreateManyLabInputEnvelope>;
export const TechnicianCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
