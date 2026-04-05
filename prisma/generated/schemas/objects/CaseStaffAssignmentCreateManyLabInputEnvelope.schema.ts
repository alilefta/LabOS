import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateManyLabInputObjectSchema as CaseStaffAssignmentCreateManyLabInputObjectSchema } from './CaseStaffAssignmentCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseStaffAssignmentCreateManyLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseStaffAssignmentCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateManyLabInputEnvelope>;
export const CaseStaffAssignmentCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
