import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCreateWithoutCasesInputObjectSchema as CaseCategoryCreateWithoutCasesInputObjectSchema } from './CaseCategoryCreateWithoutCasesInput.schema';
import { CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema as CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutCasesInput.schema';
import { CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema as CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema } from './CaseCategoryCreateOrConnectWithoutCasesInput.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCategoryCreateNestedOneWithoutCasesInputObjectSchema: z.ZodType<Prisma.CaseCategoryCreateNestedOneWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateNestedOneWithoutCasesInput>;
export const CaseCategoryCreateNestedOneWithoutCasesInputObjectZodSchema = makeSchema();
