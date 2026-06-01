import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutStaffPayoutsInputObjectSchema as LabUpdateWithoutStaffPayoutsInputObjectSchema } from './LabUpdateWithoutStaffPayoutsInput.schema';
import { LabUncheckedUpdateWithoutStaffPayoutsInputObjectSchema as LabUncheckedUpdateWithoutStaffPayoutsInputObjectSchema } from './LabUncheckedUpdateWithoutStaffPayoutsInput.schema';
import { LabCreateWithoutStaffPayoutsInputObjectSchema as LabCreateWithoutStaffPayoutsInputObjectSchema } from './LabCreateWithoutStaffPayoutsInput.schema';
import { LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema as LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema } from './LabUncheckedCreateWithoutStaffPayoutsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStaffPayoutsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutStaffPayoutsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutStaffPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutStaffPayoutsInput>;
export const LabUpsertWithoutStaffPayoutsInputObjectZodSchema = makeSchema();
