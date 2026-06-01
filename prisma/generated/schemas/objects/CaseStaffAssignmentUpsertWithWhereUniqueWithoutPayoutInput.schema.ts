import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithoutPayoutInputObjectSchema as CaseStaffAssignmentUpdateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUpdateWithoutPayoutInput.schema';
import { CaseStaffAssignmentUncheckedUpdateWithoutPayoutInputObjectSchema as CaseStaffAssignmentUncheckedUpdateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateWithoutPayoutInput.schema';
import { CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema as CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentCreateWithoutPayoutInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutPayoutInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateWithoutPayoutInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpsertWithWhereUniqueWithoutPayoutInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpsertWithWhereUniqueWithoutPayoutInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpsertWithWhereUniqueWithoutPayoutInput>;
export const CaseStaffAssignmentUpsertWithWhereUniqueWithoutPayoutInputObjectZodSchema = makeSchema();
