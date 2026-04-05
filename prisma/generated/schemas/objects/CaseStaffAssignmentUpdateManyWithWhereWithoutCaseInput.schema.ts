import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentScalarWhereInputObjectSchema as CaseStaffAssignmentScalarWhereInputObjectSchema } from './CaseStaffAssignmentScalarWhereInput.schema';
import { CaseStaffAssignmentUpdateManyMutationInputObjectSchema as CaseStaffAssignmentUpdateManyMutationInputObjectSchema } from './CaseStaffAssignmentUpdateManyMutationInput.schema';
import { CaseStaffAssignmentUncheckedUpdateManyWithoutCaseInputObjectSchema as CaseStaffAssignmentUncheckedUpdateManyWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateManyWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseStaffAssignmentUpdateManyMutationInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateManyWithoutCaseInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpdateManyWithWhereWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithWhereWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithWhereWithoutCaseInput>;
export const CaseStaffAssignmentUpdateManyWithWhereWithoutCaseInputObjectZodSchema = makeSchema();
