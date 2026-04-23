import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffUpdateWithoutCaseAssignmentsInputObjectSchema as LabStaffUpdateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUpdateWithoutCaseAssignmentsInput.schema';
import { LabStaffUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema as LabStaffUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUncheckedUpdateWithoutCaseAssignmentsInput.schema';
import { LabStaffCreateWithoutCaseAssignmentsInputObjectSchema as LabStaffCreateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffCreateWithoutCaseAssignmentsInput.schema';
import { LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema as LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUncheckedCreateWithoutCaseAssignmentsInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabStaffUpdateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabStaffCreateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema)]),
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional()
}).strict();
export const LabStaffUpsertWithoutCaseAssignmentsInputObjectSchema: z.ZodType<Prisma.LabStaffUpsertWithoutCaseAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpsertWithoutCaseAssignmentsInput>;
export const LabStaffUpsertWithoutCaseAssignmentsInputObjectZodSchema = makeSchema();
