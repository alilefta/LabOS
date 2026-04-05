import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutStaffAssignmentsInputObjectSchema as LabUpdateWithoutStaffAssignmentsInputObjectSchema } from './LabUpdateWithoutStaffAssignmentsInput.schema';
import { LabUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema as LabUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema } from './LabUncheckedUpdateWithoutStaffAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutStaffAssignmentsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutStaffAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutStaffAssignmentsInput>;
export const LabUpdateToOneWithWhereWithoutStaffAssignmentsInputObjectZodSchema = makeSchema();
