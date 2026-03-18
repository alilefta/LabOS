import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutCasePricingPlansInputObjectSchema as LabCreateWithoutCasePricingPlansInputObjectSchema } from './LabCreateWithoutCasePricingPlansInput.schema';
import { LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema as LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './LabUncheckedCreateWithoutCasePricingPlansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutCasePricingPlansInput>;
export const LabCreateOrConnectWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
