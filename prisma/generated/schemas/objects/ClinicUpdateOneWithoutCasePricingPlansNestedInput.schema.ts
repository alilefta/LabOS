import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateWithoutCasePricingPlansInputObjectSchema as ClinicCreateWithoutCasePricingPlansInputObjectSchema } from './ClinicCreateWithoutCasePricingPlansInput.schema';
import { ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema as ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './ClinicUncheckedCreateWithoutCasePricingPlansInput.schema';
import { ClinicCreateOrConnectWithoutCasePricingPlansInputObjectSchema as ClinicCreateOrConnectWithoutCasePricingPlansInputObjectSchema } from './ClinicCreateOrConnectWithoutCasePricingPlansInput.schema';
import { ClinicUpsertWithoutCasePricingPlansInputObjectSchema as ClinicUpsertWithoutCasePricingPlansInputObjectSchema } from './ClinicUpsertWithoutCasePricingPlansInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema as ClinicUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema } from './ClinicUpdateToOneWithWhereWithoutCasePricingPlansInput.schema';
import { ClinicUpdateWithoutCasePricingPlansInputObjectSchema as ClinicUpdateWithoutCasePricingPlansInputObjectSchema } from './ClinicUpdateWithoutCasePricingPlansInput.schema';
import { ClinicUncheckedUpdateWithoutCasePricingPlansInputObjectSchema as ClinicUncheckedUpdateWithoutCasePricingPlansInputObjectSchema } from './ClinicUncheckedUpdateWithoutCasePricingPlansInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ClinicCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutCasePricingPlansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ClinicCreateOrConnectWithoutCasePricingPlansInputObjectSchema).optional(),
  upsert: z.lazy(() => ClinicUpsertWithoutCasePricingPlansInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ClinicWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ClinicWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ClinicWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ClinicUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ClinicUpdateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutCasePricingPlansInputObjectSchema)]).optional()
}).strict();
export const ClinicUpdateOneWithoutCasePricingPlansNestedInputObjectSchema: z.ZodType<Prisma.ClinicUpdateOneWithoutCasePricingPlansNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateOneWithoutCasePricingPlansNestedInput>;
export const ClinicUpdateOneWithoutCasePricingPlansNestedInputObjectZodSchema = makeSchema();
