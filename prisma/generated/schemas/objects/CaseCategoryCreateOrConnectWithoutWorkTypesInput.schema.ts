import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryCreateWithoutWorkTypesInputObjectSchema as CaseCategoryCreateWithoutWorkTypesInputObjectSchema } from './CaseCategoryCreateWithoutWorkTypesInput.schema';
import { CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema as CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutWorkTypesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutWorkTypesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema)])
}).strict();
export const CaseCategoryCreateOrConnectWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.CaseCategoryCreateOrConnectWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateOrConnectWithoutWorkTypesInput>;
export const CaseCategoryCreateOrConnectWithoutWorkTypesInputObjectZodSchema = makeSchema();
