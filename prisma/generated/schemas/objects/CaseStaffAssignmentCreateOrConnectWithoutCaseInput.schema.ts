import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentCreateWithoutCaseInputObjectSchema as CaseStaffAssignmentCreateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentCreateWithoutCaseInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentCreateOrConnectWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateOrConnectWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateOrConnectWithoutCaseInput>;
export const CaseStaffAssignmentCreateOrConnectWithoutCaseInputObjectZodSchema = makeSchema();
