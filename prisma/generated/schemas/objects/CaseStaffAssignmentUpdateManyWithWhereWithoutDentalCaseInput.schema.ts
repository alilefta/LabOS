import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentScalarWhereInputObjectSchema as CaseStaffAssignmentScalarWhereInputObjectSchema } from './CaseStaffAssignmentScalarWhereInput.schema';
import { CaseStaffAssignmentUpdateManyMutationInputObjectSchema as CaseStaffAssignmentUpdateManyMutationInputObjectSchema } from './CaseStaffAssignmentUpdateManyMutationInput.schema';
import { CaseStaffAssignmentUncheckedUpdateManyWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUncheckedUpdateManyWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateManyWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseStaffAssignmentUpdateManyMutationInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateManyWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpdateManyWithWhereWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithWhereWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithWhereWithoutDentalCaseInput>;
export const CaseStaffAssignmentUpdateManyWithWhereWithoutDentalCaseInputObjectZodSchema = makeSchema();
