import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutStaffAssignmentsInputObjectSchema as LabUpdateWithoutStaffAssignmentsInputObjectSchema } from './LabUpdateWithoutStaffAssignmentsInput.schema';
import { LabUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema as LabUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema } from './LabUncheckedUpdateWithoutStaffAssignmentsInput.schema';
import { LabCreateWithoutStaffAssignmentsInputObjectSchema as LabCreateWithoutStaffAssignmentsInputObjectSchema } from './LabCreateWithoutStaffAssignmentsInput.schema';
import { LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema as LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema } from './LabUncheckedCreateWithoutStaffAssignmentsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutStaffAssignmentsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutStaffAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutStaffAssignmentsInput>;
export const LabUpsertWithoutStaffAssignmentsInputObjectZodSchema = makeSchema();
