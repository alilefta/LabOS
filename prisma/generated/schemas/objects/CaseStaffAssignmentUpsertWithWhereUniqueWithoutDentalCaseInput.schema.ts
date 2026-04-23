import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUpdateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUpdateWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentUncheckedUpdateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUncheckedUpdateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentCreateWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateWithoutDentalCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpsertWithWhereUniqueWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpsertWithWhereUniqueWithoutDentalCaseInput>;
export const CaseStaffAssignmentUpsertWithWhereUniqueWithoutDentalCaseInputObjectZodSchema = makeSchema();
