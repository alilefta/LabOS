import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateManyDentalCaseInputObjectSchema as CaseStaffAssignmentCreateManyDentalCaseInputObjectSchema } from './CaseStaffAssignmentCreateManyDentalCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseStaffAssignmentCreateManyDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateManyDentalCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseStaffAssignmentCreateManyDentalCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateManyDentalCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateManyDentalCaseInputEnvelope>;
export const CaseStaffAssignmentCreateManyDentalCaseInputEnvelopeObjectZodSchema = makeSchema();
