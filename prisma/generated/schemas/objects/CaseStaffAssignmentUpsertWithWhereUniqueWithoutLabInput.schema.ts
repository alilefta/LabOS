import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithoutLabInputObjectSchema as CaseStaffAssignmentUpdateWithoutLabInputObjectSchema } from './CaseStaffAssignmentUpdateWithoutLabInput.schema';
import { CaseStaffAssignmentUncheckedUpdateWithoutLabInputObjectSchema as CaseStaffAssignmentUncheckedUpdateWithoutLabInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateWithoutLabInput.schema';
import { CaseStaffAssignmentCreateWithoutLabInputObjectSchema as CaseStaffAssignmentCreateWithoutLabInputObjectSchema } from './CaseStaffAssignmentCreateWithoutLabInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpsertWithWhereUniqueWithoutLabInput>;
export const CaseStaffAssignmentUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
