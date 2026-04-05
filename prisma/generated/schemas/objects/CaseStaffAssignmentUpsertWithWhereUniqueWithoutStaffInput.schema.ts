import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithoutStaffInputObjectSchema as CaseStaffAssignmentUpdateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUpdateWithoutStaffInput.schema';
import { CaseStaffAssignmentUncheckedUpdateWithoutStaffInputObjectSchema as CaseStaffAssignmentUncheckedUpdateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateWithoutStaffInput.schema';
import { CaseStaffAssignmentCreateWithoutStaffInputObjectSchema as CaseStaffAssignmentCreateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentCreateWithoutStaffInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedUpdateWithoutStaffInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema)])
}).strict();
export const CaseStaffAssignmentUpsertWithWhereUniqueWithoutStaffInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpsertWithWhereUniqueWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpsertWithWhereUniqueWithoutStaffInput>;
export const CaseStaffAssignmentUpsertWithWhereUniqueWithoutStaffInputObjectZodSchema = makeSchema();
