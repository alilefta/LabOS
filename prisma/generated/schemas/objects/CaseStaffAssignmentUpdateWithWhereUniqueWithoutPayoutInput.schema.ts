import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithoutPayoutInputObjectSchema as CaseStaffAssignmentUpdateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUpdateWithoutPayoutInput.schema';
import { CaseStaffAssignmentUncheckedUpdateWithoutPayoutInputObjectSchema as CaseStaffAssignmentUncheckedUpdateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateWithoutPayoutInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateWithoutPayoutInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpdateWithWhereUniqueWithoutPayoutInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateWithWhereUniqueWithoutPayoutInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateWithWhereUniqueWithoutPayoutInput>;
export const CaseStaffAssignmentUpdateWithWhereUniqueWithoutPayoutInputObjectZodSchema = makeSchema();
