import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateWithoutCasePricingPlansInputObjectSchema as ClinicCreateWithoutCasePricingPlansInputObjectSchema } from './ClinicCreateWithoutCasePricingPlansInput.schema';
import { ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema as ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './ClinicUncheckedCreateWithoutCasePricingPlansInput.schema';
import { ClinicCreateOrConnectWithoutCasePricingPlansInputObjectSchema as ClinicCreateOrConnectWithoutCasePricingPlansInputObjectSchema } from './ClinicCreateOrConnectWithoutCasePricingPlansInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ClinicCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ClinicCreateOrConnectWithoutCasePricingPlansInputObjectSchema).optional(),
  connect: z.lazy(() => ClinicWhereUniqueInputObjectSchema).optional()
}).strict();
export const ClinicCreateNestedOneWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.ClinicCreateNestedOneWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateNestedOneWithoutCasePricingPlansInput>;
export const ClinicCreateNestedOneWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
