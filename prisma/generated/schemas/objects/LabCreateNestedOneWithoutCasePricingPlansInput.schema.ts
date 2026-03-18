import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCasePricingPlansInputObjectSchema as LabCreateWithoutCasePricingPlansInputObjectSchema } from './LabCreateWithoutCasePricingPlansInput.schema';
import { LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema as LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './LabUncheckedCreateWithoutCasePricingPlansInput.schema';
import { LabCreateOrConnectWithoutCasePricingPlansInputObjectSchema as LabCreateOrConnectWithoutCasePricingPlansInputObjectSchema } from './LabCreateOrConnectWithoutCasePricingPlansInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCasePricingPlansInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutCasePricingPlansInput>;
export const LabCreateNestedOneWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
