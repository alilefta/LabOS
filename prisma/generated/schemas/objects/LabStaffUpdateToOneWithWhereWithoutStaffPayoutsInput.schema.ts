import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabStaffUpdateWithoutStaffPayoutsInputObjectSchema as LabStaffUpdateWithoutStaffPayoutsInputObjectSchema } from './LabStaffUpdateWithoutStaffPayoutsInput.schema';
import { LabStaffUncheckedUpdateWithoutStaffPayoutsInputObjectSchema as LabStaffUncheckedUpdateWithoutStaffPayoutsInputObjectSchema } from './LabStaffUncheckedUpdateWithoutStaffPayoutsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabStaffUpdateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutStaffPayoutsInputObjectSchema)])
}).strict();
export const LabStaffUpdateToOneWithWhereWithoutStaffPayoutsInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutStaffPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutStaffPayoutsInput>;
export const LabStaffUpdateToOneWithWhereWithoutStaffPayoutsInputObjectZodSchema = makeSchema();
