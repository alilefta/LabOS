import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutLabStaffInputObjectSchema as LabUpdateWithoutLabStaffInputObjectSchema } from './LabUpdateWithoutLabStaffInput.schema';
import { LabUncheckedUpdateWithoutLabStaffInputObjectSchema as LabUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabUncheckedUpdateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutLabStaffInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutLabStaffInput>;
export const LabUpdateToOneWithWhereWithoutLabStaffInputObjectZodSchema = makeSchema();
