import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutUpdateWithoutStaffInputObjectSchema as StaffPayoutUpdateWithoutStaffInputObjectSchema } from './StaffPayoutUpdateWithoutStaffInput.schema';
import { StaffPayoutUncheckedUpdateWithoutStaffInputObjectSchema as StaffPayoutUncheckedUpdateWithoutStaffInputObjectSchema } from './StaffPayoutUncheckedUpdateWithoutStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffPayoutUpdateWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutUncheckedUpdateWithoutStaffInputObjectSchema)])
}).strict();
export const StaffPayoutUpdateWithWhereUniqueWithoutStaffInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpdateWithWhereUniqueWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpdateWithWhereUniqueWithoutStaffInput>;
export const StaffPayoutUpdateWithWhereUniqueWithoutStaffInputObjectZodSchema = makeSchema();
