import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema';
import { ClinicUpdateWithoutCasePricingPlansInputObjectSchema as ClinicUpdateWithoutCasePricingPlansInputObjectSchema } from './ClinicUpdateWithoutCasePricingPlansInput.schema';
import { ClinicUncheckedUpdateWithoutCasePricingPlansInputObjectSchema as ClinicUncheckedUpdateWithoutCasePricingPlansInputObjectSchema } from './ClinicUncheckedUpdateWithoutCasePricingPlansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ClinicUpdateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutCasePricingPlansInputObjectSchema)])
}).strict();
export const ClinicUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.ClinicUpdateToOneWithWhereWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateToOneWithWhereWithoutCasePricingPlansInput>;
export const ClinicUpdateToOneWithWhereWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
