import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutCasePricingPlansInputObjectSchema as LabUpdateWithoutCasePricingPlansInputObjectSchema } from './LabUpdateWithoutCasePricingPlansInput.schema';
import { LabUncheckedUpdateWithoutCasePricingPlansInputObjectSchema as LabUncheckedUpdateWithoutCasePricingPlansInputObjectSchema } from './LabUncheckedUpdateWithoutCasePricingPlansInput.schema';
import { LabCreateWithoutCasePricingPlansInputObjectSchema as LabCreateWithoutCasePricingPlansInputObjectSchema } from './LabCreateWithoutCasePricingPlansInput.schema';
import { LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema as LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './LabUncheckedCreateWithoutCasePricingPlansInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCasePricingPlansInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutCasePricingPlansInput>;
export const LabUpsertWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
