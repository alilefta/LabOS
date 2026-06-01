import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentScalarWhereInputObjectSchema as CaseStaffAssignmentScalarWhereInputObjectSchema } from './CaseStaffAssignmentScalarWhereInput.schema';
import { CaseStaffAssignmentUpdateManyMutationInputObjectSchema as CaseStaffAssignmentUpdateManyMutationInputObjectSchema } from './CaseStaffAssignmentUpdateManyMutationInput.schema';
import { CaseStaffAssignmentUncheckedUpdateManyWithoutPayoutInputObjectSchema as CaseStaffAssignmentUncheckedUpdateManyWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateManyWithoutPayoutInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseStaffAssignmentUpdateManyMutationInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateManyWithoutPayoutInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpdateManyWithWhereWithoutPayoutInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithWhereWithoutPayoutInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithWhereWithoutPayoutInput>;
export const CaseStaffAssignmentUpdateManyWithWhereWithoutPayoutInputObjectZodSchema = makeSchema();
