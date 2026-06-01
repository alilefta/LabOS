import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutUpdateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUpdateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUpdateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutCreateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './StaffPayoutWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StaffPayoutUpdateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema)]),
  where: z.lazy(() => StaffPayoutWhereInputObjectSchema).optional()
}).strict();
export const StaffPayoutUpsertWithoutCaseAssignmentsInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpsertWithoutCaseAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpsertWithoutCaseAssignmentsInput>;
export const StaffPayoutUpsertWithoutCaseAssignmentsInputObjectZodSchema = makeSchema();
