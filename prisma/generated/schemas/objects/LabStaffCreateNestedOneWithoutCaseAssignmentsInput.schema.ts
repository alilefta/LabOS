import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutCaseAssignmentsInputObjectSchema as LabStaffCreateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffCreateWithoutCaseAssignmentsInput.schema';
import { LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema as LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUncheckedCreateWithoutCaseAssignmentsInput.schema';
import { LabStaffCreateOrConnectWithoutCaseAssignmentsInputObjectSchema as LabStaffCreateOrConnectWithoutCaseAssignmentsInputObjectSchema } from './LabStaffCreateOrConnectWithoutCaseAssignmentsInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutCaseAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffCreateNestedOneWithoutCaseAssignmentsInputObjectSchema: z.ZodType<Prisma.LabStaffCreateNestedOneWithoutCaseAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateNestedOneWithoutCaseAssignmentsInput>;
export const LabStaffCreateNestedOneWithoutCaseAssignmentsInputObjectZodSchema = makeSchema();
