import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicCreateWithoutCasePricingPlansInputObjectSchema as ClinicCreateWithoutCasePricingPlansInputObjectSchema } from './ClinicCreateWithoutCasePricingPlansInput.schema';
import { ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema as ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './ClinicUncheckedCreateWithoutCasePricingPlansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ClinicCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema)])
}).strict();
export const ClinicCreateOrConnectWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.ClinicCreateOrConnectWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateOrConnectWithoutCasePricingPlansInput>;
export const ClinicCreateOrConnectWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
