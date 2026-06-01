import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './StaffPayoutWhereInput.schema';
import { StaffPayoutUpdateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUpdateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUpdateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StaffPayoutUpdateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema)])
}).strict();
export const StaffPayoutUpdateToOneWithWhereWithoutCaseAssignmentsInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpdateToOneWithWhereWithoutCaseAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpdateToOneWithWhereWithoutCaseAssignmentsInput>;
export const StaffPayoutUpdateToOneWithWhereWithoutCaseAssignmentsInputObjectZodSchema = makeSchema();
