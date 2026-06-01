import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateManyPayoutInputObjectSchema as CaseStaffAssignmentCreateManyPayoutInputObjectSchema } from './CaseStaffAssignmentCreateManyPayoutInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseStaffAssignmentCreateManyPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateManyPayoutInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseStaffAssignmentCreateManyPayoutInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateManyPayoutInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateManyPayoutInputEnvelope>;
export const CaseStaffAssignmentCreateManyPayoutInputEnvelopeObjectZodSchema = makeSchema();
