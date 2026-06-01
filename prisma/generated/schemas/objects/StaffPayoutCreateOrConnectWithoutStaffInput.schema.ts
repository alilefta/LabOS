import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutCreateWithoutStaffInputObjectSchema as StaffPayoutCreateWithoutStaffInputObjectSchema } from './StaffPayoutCreateWithoutStaffInput.schema';
import { StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema as StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema)])
}).strict();
export const StaffPayoutCreateOrConnectWithoutStaffInputObjectSchema: z.ZodType<Prisma.StaffPayoutCreateOrConnectWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutCreateOrConnectWithoutStaffInput>;
export const StaffPayoutCreateOrConnectWithoutStaffInputObjectZodSchema = makeSchema();
