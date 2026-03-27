import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicUpdateWithoutCasePricingPlansInputObjectSchema as ClinicUpdateWithoutCasePricingPlansInputObjectSchema } from './ClinicUpdateWithoutCasePricingPlansInput.schema';
import { ClinicUncheckedUpdateWithoutCasePricingPlansInputObjectSchema as ClinicUncheckedUpdateWithoutCasePricingPlansInputObjectSchema } from './ClinicUncheckedUpdateWithoutCasePricingPlansInput.schema';
import { ClinicCreateWithoutCasePricingPlansInputObjectSchema as ClinicCreateWithoutCasePricingPlansInputObjectSchema } from './ClinicCreateWithoutCasePricingPlansInput.schema';
import { ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema as ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './ClinicUncheckedCreateWithoutCasePricingPlansInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ClinicUpdateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutCasePricingPlansInputObjectSchema)]),
  create: z.union([z.lazy(() => ClinicCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema)]),
  where: z.lazy(() => ClinicWhereInputObjectSchema).optional()
}).strict();
export const ClinicUpsertWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.ClinicUpsertWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpsertWithoutCasePricingPlansInput>;
export const ClinicUpsertWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
