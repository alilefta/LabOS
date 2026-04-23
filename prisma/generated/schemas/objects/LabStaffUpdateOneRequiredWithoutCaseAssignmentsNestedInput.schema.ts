import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutCaseAssignmentsInputObjectSchema as LabStaffCreateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffCreateWithoutCaseAssignmentsInput.schema';
import { LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema as LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUncheckedCreateWithoutCaseAssignmentsInput.schema';
import { LabStaffCreateOrConnectWithoutCaseAssignmentsInputObjectSchema as LabStaffCreateOrConnectWithoutCaseAssignmentsInputObjectSchema } from './LabStaffCreateOrConnectWithoutCaseAssignmentsInput.schema';
import { LabStaffUpsertWithoutCaseAssignmentsInputObjectSchema as LabStaffUpsertWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUpsertWithoutCaseAssignmentsInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffUpdateToOneWithWhereWithoutCaseAssignmentsInputObjectSchema as LabStaffUpdateToOneWithWhereWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUpdateToOneWithWhereWithoutCaseAssignmentsInput.schema';
import { LabStaffUpdateWithoutCaseAssignmentsInputObjectSchema as LabStaffUpdateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUpdateWithoutCaseAssignmentsInput.schema';
import { LabStaffUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema as LabStaffUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema } from './LabStaffUncheckedUpdateWithoutCaseAssignmentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutCaseAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutCaseAssignmentsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabStaffUpsertWithoutCaseAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabStaffUpdateToOneWithWhereWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => LabStaffUpdateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema)]).optional()
}).strict();
export const LabStaffUpdateOneRequiredWithoutCaseAssignmentsNestedInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateOneRequiredWithoutCaseAssignmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateOneRequiredWithoutCaseAssignmentsNestedInput>;
export const LabStaffUpdateOneRequiredWithoutCaseAssignmentsNestedInputObjectZodSchema = makeSchema();
