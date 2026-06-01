import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutStaffPayoutsInputObjectSchema as LabCreateWithoutStaffPayoutsInputObjectSchema } from './LabCreateWithoutStaffPayoutsInput.schema';
import { LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema as LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema } from './LabUncheckedCreateWithoutStaffPayoutsInput.schema';
import { LabCreateOrConnectWithoutStaffPayoutsInputObjectSchema as LabCreateOrConnectWithoutStaffPayoutsInputObjectSchema } from './LabCreateOrConnectWithoutStaffPayoutsInput.schema';
import { LabUpsertWithoutStaffPayoutsInputObjectSchema as LabUpsertWithoutStaffPayoutsInputObjectSchema } from './LabUpsertWithoutStaffPayoutsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutStaffPayoutsInputObjectSchema as LabUpdateToOneWithWhereWithoutStaffPayoutsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutStaffPayoutsInput.schema';
import { LabUpdateWithoutStaffPayoutsInputObjectSchema as LabUpdateWithoutStaffPayoutsInputObjectSchema } from './LabUpdateWithoutStaffPayoutsInput.schema';
import { LabUncheckedUpdateWithoutStaffPayoutsInputObjectSchema as LabUncheckedUpdateWithoutStaffPayoutsInputObjectSchema } from './LabUncheckedUpdateWithoutStaffPayoutsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutStaffPayoutsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutStaffPayoutsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabUpdateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStaffPayoutsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutStaffPayoutsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutStaffPayoutsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutStaffPayoutsNestedInput>;
export const LabUpdateOneRequiredWithoutStaffPayoutsNestedInputObjectZodSchema = makeSchema();
