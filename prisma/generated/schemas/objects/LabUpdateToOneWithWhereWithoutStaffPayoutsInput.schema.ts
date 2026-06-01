import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutStaffPayoutsInputObjectSchema as LabUpdateWithoutStaffPayoutsInputObjectSchema } from './LabUpdateWithoutStaffPayoutsInput.schema';
import { LabUncheckedUpdateWithoutStaffPayoutsInputObjectSchema as LabUncheckedUpdateWithoutStaffPayoutsInputObjectSchema } from './LabUncheckedUpdateWithoutStaffPayoutsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStaffPayoutsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutStaffPayoutsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutStaffPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutStaffPayoutsInput>;
export const LabUpdateToOneWithWhereWithoutStaffPayoutsInputObjectZodSchema = makeSchema();
