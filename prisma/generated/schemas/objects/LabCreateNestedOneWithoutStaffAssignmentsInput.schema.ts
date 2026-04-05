import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutStaffAssignmentsInputObjectSchema as LabCreateWithoutStaffAssignmentsInputObjectSchema } from './LabCreateWithoutStaffAssignmentsInput.schema';
import { LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema as LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema } from './LabUncheckedCreateWithoutStaffAssignmentsInput.schema';
import { LabCreateOrConnectWithoutStaffAssignmentsInputObjectSchema as LabCreateOrConnectWithoutStaffAssignmentsInputObjectSchema } from './LabCreateOrConnectWithoutStaffAssignmentsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutStaffAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutStaffAssignmentsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutStaffAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutStaffAssignmentsInput>;
export const LabCreateNestedOneWithoutStaffAssignmentsInputObjectZodSchema = makeSchema();
