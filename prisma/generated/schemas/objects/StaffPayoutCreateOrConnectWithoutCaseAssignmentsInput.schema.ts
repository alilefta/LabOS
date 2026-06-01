import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutCreateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutCaseAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema)])
}).strict();
export const StaffPayoutCreateOrConnectWithoutCaseAssignmentsInputObjectSchema: z.ZodType<Prisma.StaffPayoutCreateOrConnectWithoutCaseAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutCreateOrConnectWithoutCaseAssignmentsInput>;
export const StaffPayoutCreateOrConnectWithoutCaseAssignmentsInputObjectZodSchema = makeSchema();
