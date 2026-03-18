import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutCasePricingPlansInputObjectSchema as LabUpdateWithoutCasePricingPlansInputObjectSchema } from './LabUpdateWithoutCasePricingPlansInput.schema';
import { LabUncheckedUpdateWithoutCasePricingPlansInputObjectSchema as LabUncheckedUpdateWithoutCasePricingPlansInputObjectSchema } from './LabUncheckedUpdateWithoutCasePricingPlansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCasePricingPlansInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCasePricingPlansInput>;
export const LabUpdateToOneWithWhereWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
