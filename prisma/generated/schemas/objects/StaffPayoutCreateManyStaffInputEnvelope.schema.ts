import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutCreateManyStaffInputObjectSchema as StaffPayoutCreateManyStaffInputObjectSchema } from './StaffPayoutCreateManyStaffInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffPayoutCreateManyStaffInputObjectSchema), z.lazy(() => StaffPayoutCreateManyStaffInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffPayoutCreateManyStaffInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffPayoutCreateManyStaffInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutCreateManyStaffInputEnvelope>;
export const StaffPayoutCreateManyStaffInputEnvelopeObjectZodSchema = makeSchema();
