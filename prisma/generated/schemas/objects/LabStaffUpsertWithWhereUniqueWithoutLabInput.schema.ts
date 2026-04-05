import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffUpdateWithoutLabInputObjectSchema as LabStaffUpdateWithoutLabInputObjectSchema } from './LabStaffUpdateWithoutLabInput.schema';
import { LabStaffUncheckedUpdateWithoutLabInputObjectSchema as LabStaffUncheckedUpdateWithoutLabInputObjectSchema } from './LabStaffUncheckedUpdateWithoutLabInput.schema';
import { LabStaffCreateWithoutLabInputObjectSchema as LabStaffCreateWithoutLabInputObjectSchema } from './LabStaffCreateWithoutLabInput.schema';
import { LabStaffUncheckedCreateWithoutLabInputObjectSchema as LabStaffUncheckedCreateWithoutLabInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => LabStaffUpdateWithoutLabInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const LabStaffUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.LabStaffUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpsertWithWhereUniqueWithoutLabInput>;
export const LabStaffUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
