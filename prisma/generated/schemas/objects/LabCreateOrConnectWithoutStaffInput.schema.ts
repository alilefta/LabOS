import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutStaffInputObjectSchema as LabCreateWithoutStaffInputObjectSchema } from './LabCreateWithoutStaffInput.schema';
import { LabUncheckedCreateWithoutStaffInputObjectSchema as LabUncheckedCreateWithoutStaffInputObjectSchema } from './LabUncheckedCreateWithoutStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutStaffInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutStaffInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutStaffInput>;
export const LabCreateOrConnectWithoutStaffInputObjectZodSchema = makeSchema();
