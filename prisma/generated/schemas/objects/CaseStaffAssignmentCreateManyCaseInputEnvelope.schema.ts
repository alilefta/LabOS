import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateManyCaseInputObjectSchema as CaseStaffAssignmentCreateManyCaseInputObjectSchema } from './CaseStaffAssignmentCreateManyCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseStaffAssignmentCreateManyCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateManyCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseStaffAssignmentCreateManyCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateManyCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateManyCaseInputEnvelope>;
export const CaseStaffAssignmentCreateManyCaseInputEnvelopeObjectZodSchema = makeSchema();
