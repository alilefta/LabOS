import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithoutCaseInputObjectSchema as CaseStaffAssignmentUpdateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUpdateWithoutCaseInput.schema';
import { CaseStaffAssignmentUncheckedUpdateWithoutCaseInputObjectSchema as CaseStaffAssignmentUncheckedUpdateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpdateWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateWithWhereUniqueWithoutCaseInput>;
export const CaseStaffAssignmentUpdateWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();
