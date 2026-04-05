import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithoutStaffInputObjectSchema as CaseStaffAssignmentUpdateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUpdateWithoutStaffInput.schema';
import { CaseStaffAssignmentUncheckedUpdateWithoutStaffInputObjectSchema as CaseStaffAssignmentUncheckedUpdateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateWithoutStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateWithoutStaffInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpdateWithWhereUniqueWithoutStaffInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateWithWhereUniqueWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateWithWhereUniqueWithoutStaffInput>;
export const CaseStaffAssignmentUpdateWithWhereUniqueWithoutStaffInputObjectZodSchema = makeSchema();
