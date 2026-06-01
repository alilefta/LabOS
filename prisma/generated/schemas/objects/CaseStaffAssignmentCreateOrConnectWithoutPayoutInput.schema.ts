import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema as CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentCreateWithoutPayoutInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutPayoutInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentCreateOrConnectWithoutPayoutInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateOrConnectWithoutPayoutInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateOrConnectWithoutPayoutInput>;
export const CaseStaffAssignmentCreateOrConnectWithoutPayoutInputObjectZodSchema = makeSchema();
