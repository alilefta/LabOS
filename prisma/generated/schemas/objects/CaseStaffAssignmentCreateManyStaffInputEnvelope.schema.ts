import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateManyStaffInputObjectSchema as CaseStaffAssignmentCreateManyStaffInputObjectSchema } from './CaseStaffAssignmentCreateManyStaffInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseStaffAssignmentCreateManyStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateManyStaffInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseStaffAssignmentCreateManyStaffInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateManyStaffInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateManyStaffInputEnvelope>;
export const CaseStaffAssignmentCreateManyStaffInputEnvelopeObjectZodSchema = makeSchema();
