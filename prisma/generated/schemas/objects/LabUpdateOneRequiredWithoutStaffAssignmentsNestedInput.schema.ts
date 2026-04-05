import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutStaffAssignmentsInputObjectSchema as LabCreateWithoutStaffAssignmentsInputObjectSchema } from './LabCreateWithoutStaffAssignmentsInput.schema';
import { LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema as LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema } from './LabUncheckedCreateWithoutStaffAssignmentsInput.schema';
import { LabCreateOrConnectWithoutStaffAssignmentsInputObjectSchema as LabCreateOrConnectWithoutStaffAssignmentsInputObjectSchema } from './LabCreateOrConnectWithoutStaffAssignmentsInput.schema';
import { LabUpsertWithoutStaffAssignmentsInputObjectSchema as LabUpsertWithoutStaffAssignmentsInputObjectSchema } from './LabUpsertWithoutStaffAssignmentsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutStaffAssignmentsInputObjectSchema as LabUpdateToOneWithWhereWithoutStaffAssignmentsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutStaffAssignmentsInput.schema';
import { LabUpdateWithoutStaffAssignmentsInputObjectSchema as LabUpdateWithoutStaffAssignmentsInputObjectSchema } from './LabUpdateWithoutStaffAssignmentsInput.schema';
import { LabUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema as LabUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema } from './LabUncheckedUpdateWithoutStaffAssignmentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutStaffAssignmentsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutStaffAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => LabUpdateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutStaffAssignmentsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutStaffAssignmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutStaffAssignmentsNestedInput>;
export const LabUpdateOneRequiredWithoutStaffAssignmentsNestedInputObjectZodSchema = makeSchema();
