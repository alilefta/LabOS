import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithoutCaseInputObjectSchema as CaseStaffAssignmentUpdateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUpdateWithoutCaseInput.schema';
import { CaseStaffAssignmentUncheckedUpdateWithoutCaseInputObjectSchema as CaseStaffAssignmentUncheckedUpdateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateWithoutCaseInput.schema';
import { CaseStaffAssignmentCreateWithoutCaseInputObjectSchema as CaseStaffAssignmentCreateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentCreateWithoutCaseInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateWithoutCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpsertWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpsertWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpsertWithWhereUniqueWithoutCaseInput>;
export const CaseStaffAssignmentUpsertWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();
