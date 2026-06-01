import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutCreateManyLabInputObjectSchema as StaffPayoutCreateManyLabInputObjectSchema } from './StaffPayoutCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffPayoutCreateManyLabInputObjectSchema), z.lazy(() => StaffPayoutCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffPayoutCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffPayoutCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutCreateManyLabInputEnvelope>;
export const StaffPayoutCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
