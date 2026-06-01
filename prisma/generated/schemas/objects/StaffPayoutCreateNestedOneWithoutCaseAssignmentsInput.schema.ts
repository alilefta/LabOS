import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutCreateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutCreateOrConnectWithoutCaseAssignmentsInputObjectSchema as StaffPayoutCreateOrConnectWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutCreateOrConnectWithoutCaseAssignmentsInput.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffPayoutCreateOrConnectWithoutCaseAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).optional()
}).strict();
export const StaffPayoutCreateNestedOneWithoutCaseAssignmentsInputObjectSchema: z.ZodType<Prisma.StaffPayoutCreateNestedOneWithoutCaseAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutCreateNestedOneWithoutCaseAssignmentsInput>;
export const StaffPayoutCreateNestedOneWithoutCaseAssignmentsInputObjectZodSchema = makeSchema();
