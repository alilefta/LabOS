import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCasePricingPlansInputObjectSchema as LabCreateWithoutCasePricingPlansInputObjectSchema } from './LabCreateWithoutCasePricingPlansInput.schema';
import { LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema as LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './LabUncheckedCreateWithoutCasePricingPlansInput.schema';
import { LabCreateOrConnectWithoutCasePricingPlansInputObjectSchema as LabCreateOrConnectWithoutCasePricingPlansInputObjectSchema } from './LabCreateOrConnectWithoutCasePricingPlansInput.schema';
import { LabUpsertWithoutCasePricingPlansInputObjectSchema as LabUpsertWithoutCasePricingPlansInputObjectSchema } from './LabUpsertWithoutCasePricingPlansInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema as LabUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema } from './LabUpdateToOneWithWhereWithoutCasePricingPlansInput.schema';
import { LabUpdateWithoutCasePricingPlansInputObjectSchema as LabUpdateWithoutCasePricingPlansInputObjectSchema } from './LabUpdateWithoutCasePricingPlansInput.schema';
import { LabUncheckedUpdateWithoutCasePricingPlansInputObjectSchema as LabUncheckedUpdateWithoutCasePricingPlansInputObjectSchema } from './LabUncheckedUpdateWithoutCasePricingPlansInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCasePricingPlansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCasePricingPlansInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutCasePricingPlansInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema), z.lazy(() => LabUpdateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCasePricingPlansInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutCasePricingPlansNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutCasePricingPlansNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutCasePricingPlansNestedInput>;
export const LabUpdateOneRequiredWithoutCasePricingPlansNestedInputObjectZodSchema = makeSchema();
