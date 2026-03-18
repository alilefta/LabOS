import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutTechniciansInputObjectSchema as LabUpdateWithoutTechniciansInputObjectSchema } from './LabUpdateWithoutTechniciansInput.schema';
import { LabUncheckedUpdateWithoutTechniciansInputObjectSchema as LabUncheckedUpdateWithoutTechniciansInputObjectSchema } from './LabUncheckedUpdateWithoutTechniciansInput.schema';
import { LabCreateWithoutTechniciansInputObjectSchema as LabCreateWithoutTechniciansInputObjectSchema } from './LabCreateWithoutTechniciansInput.schema';
import { LabUncheckedCreateWithoutTechniciansInputObjectSchema as LabUncheckedCreateWithoutTechniciansInputObjectSchema } from './LabUncheckedCreateWithoutTechniciansInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutTechniciansInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutTechniciansInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutTechniciansInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutTechniciansInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutTechniciansInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutTechniciansInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutTechniciansInput>;
export const LabUpsertWithoutTechniciansInputObjectZodSchema = makeSchema();
