import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffUpdateWithoutLabInputObjectSchema as LabStaffUpdateWithoutLabInputObjectSchema } from './LabStaffUpdateWithoutLabInput.schema';
import { LabStaffUncheckedUpdateWithoutLabInputObjectSchema as LabStaffUncheckedUpdateWithoutLabInputObjectSchema } from './LabStaffUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => LabStaffUpdateWithoutLabInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const LabStaffUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateWithWhereUniqueWithoutLabInput>;
export const LabStaffUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
