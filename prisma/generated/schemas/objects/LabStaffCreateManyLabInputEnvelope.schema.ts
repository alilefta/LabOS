import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateManyLabInputObjectSchema as LabStaffCreateManyLabInputObjectSchema } from './LabStaffCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => LabStaffCreateManyLabInputObjectSchema), z.lazy(() => LabStaffCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const LabStaffCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.LabStaffCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateManyLabInputEnvelope>;
export const LabStaffCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
