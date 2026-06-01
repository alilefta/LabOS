import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffCreateWithoutStaffPayoutsInputObjectSchema as LabStaffCreateWithoutStaffPayoutsInputObjectSchema } from './LabStaffCreateWithoutStaffPayoutsInput.schema';
import { LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema as LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema } from './LabStaffUncheckedCreateWithoutStaffPayoutsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabStaffCreateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema)])
}).strict();
export const LabStaffCreateOrConnectWithoutStaffPayoutsInputObjectSchema: z.ZodType<Prisma.LabStaffCreateOrConnectWithoutStaffPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateOrConnectWithoutStaffPayoutsInput>;
export const LabStaffCreateOrConnectWithoutStaffPayoutsInputObjectZodSchema = makeSchema();
