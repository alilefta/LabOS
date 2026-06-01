import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutStaffPayoutsInputObjectSchema as LabCreateWithoutStaffPayoutsInputObjectSchema } from './LabCreateWithoutStaffPayoutsInput.schema';
import { LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema as LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema } from './LabUncheckedCreateWithoutStaffPayoutsInput.schema';
import { LabCreateOrConnectWithoutStaffPayoutsInputObjectSchema as LabCreateOrConnectWithoutStaffPayoutsInputObjectSchema } from './LabCreateOrConnectWithoutStaffPayoutsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutStaffPayoutsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutStaffPayoutsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutStaffPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutStaffPayoutsInput>;
export const LabCreateNestedOneWithoutStaffPayoutsInputObjectZodSchema = makeSchema();
