import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryCreateWithoutLabInputObjectSchema as CaseCategoryCreateWithoutLabInputObjectSchema } from './CaseCategoryCreateWithoutLabInput.schema';
import { CaseCategoryUncheckedCreateWithoutLabInputObjectSchema as CaseCategoryUncheckedCreateWithoutLabInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseCategoryCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseCategoryCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateOrConnectWithoutLabInput>;
export const CaseCategoryCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
