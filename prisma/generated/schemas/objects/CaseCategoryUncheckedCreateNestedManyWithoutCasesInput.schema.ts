import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCreateWithoutCasesInputObjectSchema as CaseCategoryCreateWithoutCasesInputObjectSchema } from './CaseCategoryCreateWithoutCasesInput.schema';
import { CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema as CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutCasesInput.schema';
import { CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema as CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema } from './CaseCategoryCreateOrConnectWithoutCasesInput.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryCreateWithoutCasesInputObjectSchema).array(), z.lazy(() => CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema), z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseCategoryUncheckedCreateNestedManyWithoutCasesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUncheckedCreateNestedManyWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUncheckedCreateNestedManyWithoutCasesInput>;
export const CaseCategoryUncheckedCreateNestedManyWithoutCasesInputObjectZodSchema = makeSchema();
