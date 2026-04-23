import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutStaffInputObjectSchema as LabUpdateWithoutStaffInputObjectSchema } from './LabUpdateWithoutStaffInput.schema';
import { LabUncheckedUpdateWithoutStaffInputObjectSchema as LabUncheckedUpdateWithoutStaffInputObjectSchema } from './LabUncheckedUpdateWithoutStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutStaffInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStaffInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutStaffInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutStaffInput>;
export const LabUpdateToOneWithWhereWithoutStaffInputObjectZodSchema = makeSchema();
