import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffCreateWithoutCaseAssignmentsInputObjectSchema as LabStaffCreateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffCreateWithoutCaseAssignmentsInput.schema';
import { LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema as LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUncheckedCreateWithoutCaseAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabStaffCreateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema)])
}).strict();
export const LabStaffCreateOrConnectWithoutCaseAssignmentsInputObjectSchema: z.ZodType<Prisma.LabStaffCreateOrConnectWithoutCaseAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateOrConnectWithoutCaseAssignmentsInput>;
export const LabStaffCreateOrConnectWithoutCaseAssignmentsInputObjectZodSchema = makeSchema();
