import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutStaffPayoutsInputObjectSchema as LabCreateWithoutStaffPayoutsInputObjectSchema } from './LabCreateWithoutStaffPayoutsInput.schema';
import { LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema as LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema } from './LabUncheckedCreateWithoutStaffPayoutsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutStaffPayoutsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffPayoutsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutStaffPayoutsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutStaffPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutStaffPayoutsInput>;
export const LabCreateOrConnectWithoutStaffPayoutsInputObjectZodSchema = makeSchema();
