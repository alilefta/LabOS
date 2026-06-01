import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutStaffPayoutsInputObjectSchema as LabStaffCreateWithoutStaffPayoutsInputObjectSchema } from './LabStaffCreateWithoutStaffPayoutsInput.schema';
import { LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema as LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema } from './LabStaffUncheckedCreateWithoutStaffPayoutsInput.schema';
import { LabStaffCreateOrConnectWithoutStaffPayoutsInputObjectSchema as LabStaffCreateOrConnectWithoutStaffPayoutsInputObjectSchema } from './LabStaffCreateOrConnectWithoutStaffPayoutsInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutStaffPayoutsInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffCreateNestedOneWithoutStaffPayoutsInputObjectSchema: z.ZodType<Prisma.LabStaffCreateNestedOneWithoutStaffPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateNestedOneWithoutStaffPayoutsInput>;
export const LabStaffCreateNestedOneWithoutStaffPayoutsInputObjectZodSchema = makeSchema();
