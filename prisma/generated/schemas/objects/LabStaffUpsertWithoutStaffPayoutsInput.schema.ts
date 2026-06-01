import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffUpdateWithoutStaffPayoutsInputObjectSchema as LabStaffUpdateWithoutStaffPayoutsInputObjectSchema } from './LabStaffUpdateWithoutStaffPayoutsInput.schema';
import { LabStaffUncheckedUpdateWithoutStaffPayoutsInputObjectSchema as LabStaffUncheckedUpdateWithoutStaffPayoutsInputObjectSchema } from './LabStaffUncheckedUpdateWithoutStaffPayoutsInput.schema';
import { LabStaffCreateWithoutStaffPayoutsInputObjectSchema as LabStaffCreateWithoutStaffPayoutsInputObjectSchema } from './LabStaffCreateWithoutStaffPayoutsInput.schema';
import { LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema as LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema } from './LabStaffUncheckedCreateWithoutStaffPayoutsInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabStaffUpdateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutStaffPayoutsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabStaffCreateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema)]),
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional()
}).strict();
export const LabStaffUpsertWithoutStaffPayoutsInputObjectSchema: z.ZodType<Prisma.LabStaffUpsertWithoutStaffPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpsertWithoutStaffPayoutsInput>;
export const LabStaffUpsertWithoutStaffPayoutsInputObjectZodSchema = makeSchema();
