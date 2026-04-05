import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentScalarWhereInputObjectSchema as CaseStaffAssignmentScalarWhereInputObjectSchema } from './CaseStaffAssignmentScalarWhereInput.schema';
import { CaseStaffAssignmentUpdateManyMutationInputObjectSchema as CaseStaffAssignmentUpdateManyMutationInputObjectSchema } from './CaseStaffAssignmentUpdateManyMutationInput.schema';
import { CaseStaffAssignmentUncheckedUpdateManyWithoutLabInputObjectSchema as CaseStaffAssignmentUncheckedUpdateManyWithoutLabInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseStaffAssignmentUpdateManyMutationInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithWhereWithoutLabInput>;
export const CaseStaffAssignmentUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
