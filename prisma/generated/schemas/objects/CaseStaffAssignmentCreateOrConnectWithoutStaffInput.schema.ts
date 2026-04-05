import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentCreateWithoutStaffInputObjectSchema as CaseStaffAssignmentCreateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentCreateWithoutStaffInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentCreateOrConnectWithoutStaffInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateOrConnectWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateOrConnectWithoutStaffInput>;
export const CaseStaffAssignmentCreateOrConnectWithoutStaffInputObjectZodSchema = makeSchema();
