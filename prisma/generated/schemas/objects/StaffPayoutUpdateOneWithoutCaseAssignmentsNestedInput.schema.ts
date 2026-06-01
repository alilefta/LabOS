import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutCreateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutCreateOrConnectWithoutCaseAssignmentsInputObjectSchema as StaffPayoutCreateOrConnectWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutCreateOrConnectWithoutCaseAssignmentsInput.schema';
import { StaffPayoutUpsertWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUpsertWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUpsertWithoutCaseAssignmentsInput.schema';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './StaffPayoutWhereInput.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutUpdateToOneWithWhereWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUpdateToOneWithWhereWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUpdateToOneWithWhereWithoutCaseAssignmentsInput.schema';
import { StaffPayoutUpdateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUpdateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUpdateWithoutCaseAssignmentsInput.schema';
import { StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema as StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema } from './StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutCaseAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffPayoutCreateOrConnectWithoutCaseAssignmentsInputObjectSchema).optional(),
  upsert: z.lazy(() => StaffPayoutUpsertWithoutCaseAssignmentsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => StaffPayoutWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => StaffPayoutWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StaffPayoutUpdateToOneWithWhereWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => StaffPayoutUpdateWithoutCaseAssignmentsInputObjectSchema), z.lazy(() => StaffPayoutUncheckedUpdateWithoutCaseAssignmentsInputObjectSchema)]).optional()
}).strict();
export const StaffPayoutUpdateOneWithoutCaseAssignmentsNestedInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpdateOneWithoutCaseAssignmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpdateOneWithoutCaseAssignmentsNestedInput>;
export const StaffPayoutUpdateOneWithoutCaseAssignmentsNestedInputObjectZodSchema = makeSchema();
