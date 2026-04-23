import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentCreateWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInput>;
export const CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInputObjectZodSchema = makeSchema();
