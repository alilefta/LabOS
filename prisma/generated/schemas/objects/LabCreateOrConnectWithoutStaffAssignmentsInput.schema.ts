import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutStaffAssignmentsInputObjectSchema as LabCreateWithoutStaffAssignmentsInputObjectSchema } from './LabCreateWithoutStaffAssignmentsInput.schema';
import { LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema as LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema } from './LabUncheckedCreateWithoutStaffAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffAssignmentsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutStaffAssignmentsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutStaffAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutStaffAssignmentsInput>;
export const LabCreateOrConnectWithoutStaffAssignmentsInputObjectZodSchema = makeSchema();
