import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutTechniciansInputObjectSchema as LabUpdateWithoutTechniciansInputObjectSchema } from './LabUpdateWithoutTechniciansInput.schema';
import { LabUncheckedUpdateWithoutTechniciansInputObjectSchema as LabUncheckedUpdateWithoutTechniciansInputObjectSchema } from './LabUncheckedUpdateWithoutTechniciansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutTechniciansInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutTechniciansInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutTechniciansInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutTechniciansInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutTechniciansInput>;
export const LabUpdateToOneWithWhereWithoutTechniciansInputObjectZodSchema = makeSchema();
