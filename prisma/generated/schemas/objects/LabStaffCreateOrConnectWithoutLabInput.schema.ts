import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffCreateWithoutLabInputObjectSchema as LabStaffCreateWithoutLabInputObjectSchema } from './LabStaffCreateWithoutLabInput.schema';
import { LabStaffUncheckedCreateWithoutLabInputObjectSchema as LabStaffUncheckedCreateWithoutLabInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const LabStaffCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.LabStaffCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateOrConnectWithoutLabInput>;
export const LabStaffCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
