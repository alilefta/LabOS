import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentCreateWithoutLabInputObjectSchema as CaseStaffAssignmentCreateWithoutLabInputObjectSchema } from './CaseStaffAssignmentCreateWithoutLabInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateOrConnectWithoutLabInput>;
export const CaseStaffAssignmentCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
