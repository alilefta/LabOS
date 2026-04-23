import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabStaffUpdateWithoutCaseAssignmentsInputObjectSchema as LabStaffUpdateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUpdateWithoutCaseAssignmentsInput.schema';
import { LabStaffUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema as LabStaffUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUncheckedUpdateWithoutCaseAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabStaffUpdateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema)])
}).strict();
export const LabStaffUpdateToOneWithWhereWithoutCaseAssignmentsInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutCaseAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutCaseAssignmentsInput>;
export const LabStaffUpdateToOneWithWhereWithoutCaseAssignmentsInputObjectZodSchema = makeSchema();
