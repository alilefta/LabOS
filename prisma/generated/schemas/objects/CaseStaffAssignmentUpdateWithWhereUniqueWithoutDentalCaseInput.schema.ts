import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUpdateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUpdateWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentUncheckedUpdateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUncheckedUpdateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateWithWhereUniqueWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateWithWhereUniqueWithoutDentalCaseInput>;
export const CaseStaffAssignmentUpdateWithWhereUniqueWithoutDentalCaseInputObjectZodSchema = makeSchema();
