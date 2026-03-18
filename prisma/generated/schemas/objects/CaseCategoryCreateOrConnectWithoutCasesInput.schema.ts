import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryCreateWithoutCasesInputObjectSchema as CaseCategoryCreateWithoutCasesInputObjectSchema } from './CaseCategoryCreateWithoutCasesInput.schema';
import { CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema as CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema: z.ZodType<Prisma.CaseCategoryCreateOrConnectWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateOrConnectWithoutCasesInput>;
export const CaseCategoryCreateOrConnectWithoutCasesInputObjectZodSchema = makeSchema();
