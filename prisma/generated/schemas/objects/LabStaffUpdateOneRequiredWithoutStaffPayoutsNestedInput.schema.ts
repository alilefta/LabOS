import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutStaffPayoutsInputObjectSchema as LabStaffCreateWithoutStaffPayoutsInputObjectSchema } from './LabStaffCreateWithoutStaffPayoutsInput.schema';
import { LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema as LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema } from './LabStaffUncheckedCreateWithoutStaffPayoutsInput.schema';
import { LabStaffCreateOrConnectWithoutStaffPayoutsInputObjectSchema as LabStaffCreateOrConnectWithoutStaffPayoutsInputObjectSchema } from './LabStaffCreateOrConnectWithoutStaffPayoutsInput.schema';
import { LabStaffUpsertWithoutStaffPayoutsInputObjectSchema as LabStaffUpsertWithoutStaffPayoutsInputObjectSchema } from './LabStaffUpsertWithoutStaffPayoutsInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffUpdateToOneWithWhereWithoutStaffPayoutsInputObjectSchema as LabStaffUpdateToOneWithWhereWithoutStaffPayoutsInputObjectSchema } from './LabStaffUpdateToOneWithWhereWithoutStaffPayoutsInput.schema';
import { LabStaffUpdateWithoutStaffPayoutsInputObjectSchema as LabStaffUpdateWithoutStaffPayoutsInputObjectSchema } from './LabStaffUpdateWithoutStaffPayoutsInput.schema';
import { LabStaffUncheckedUpdateWithoutStaffPayoutsInputObjectSchema as LabStaffUncheckedUpdateWithoutStaffPayoutsInputObjectSchema } from './LabStaffUncheckedUpdateWithoutStaffPayoutsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutStaffPayoutsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutStaffPayoutsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabStaffUpsertWithoutStaffPayoutsInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabStaffUpdateToOneWithWhereWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabStaffUpdateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutStaffPayoutsInputObjectSchema)]).optional()
}).strict();
export const LabStaffUpdateOneRequiredWithoutStaffPayoutsNestedInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateOneRequiredWithoutStaffPayoutsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateOneRequiredWithoutStaffPayoutsNestedInput>;
export const LabStaffUpdateOneRequiredWithoutStaffPayoutsNestedInputObjectZodSchema = makeSchema();
