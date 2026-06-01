import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutUpdateWithoutStaffInputObjectSchema as StaffPayoutUpdateWithoutStaffInputObjectSchema } from './StaffPayoutUpdateWithoutStaffInput.schema';
import { StaffPayoutUncheckedUpdateWithoutStaffInputObjectSchema as StaffPayoutUncheckedUpdateWithoutStaffInputObjectSchema } from './StaffPayoutUncheckedUpdateWithoutStaffInput.schema';
import { StaffPayoutCreateWithoutStaffInputObjectSchema as StaffPayoutCreateWithoutStaffInputObjectSchema } from './StaffPayoutCreateWithoutStaffInput.schema';
import { StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema as StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffPayoutUpdateWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutUncheckedUpdateWithoutStaffInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema)])
}).strict();
export const StaffPayoutUpsertWithWhereUniqueWithoutStaffInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpsertWithWhereUniqueWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpsertWithWhereUniqueWithoutStaffInput>;
export const StaffPayoutUpsertWithWhereUniqueWithoutStaffInputObjectZodSchema = makeSchema();
