import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithoutLabInputObjectSchema as CaseStaffAssignmentUpdateWithoutLabInputObjectSchema } from './CaseStaffAssignmentUpdateWithoutLabInput.schema';
import { CaseStaffAssignmentUncheckedUpdateWithoutLabInputObjectSchema as CaseStaffAssignmentUncheckedUpdateWithoutLabInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateWithWhereUniqueWithoutLabInput>;
export const CaseStaffAssignmentUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
