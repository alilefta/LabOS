import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCreateWithoutCasesInputObjectSchema as CaseCategoryCreateWithoutCasesInputObjectSchema } from './CaseCategoryCreateWithoutCasesInput.schema';
import { CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema as CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutCasesInput.schema';
import { CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema as CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema } from './CaseCategoryCreateOrConnectWithoutCasesInput.schema';
import { CaseCategoryUpsertWithoutCasesInputObjectSchema as CaseCategoryUpsertWithoutCasesInputObjectSchema } from './CaseCategoryUpsertWithoutCasesInput.schema';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryUpdateToOneWithWhereWithoutCasesInputObjectSchema as CaseCategoryUpdateToOneWithWhereWithoutCasesInputObjectSchema } from './CaseCategoryUpdateToOneWithWhereWithoutCasesInput.schema';
import { CaseCategoryUpdateWithoutCasesInputObjectSchema as CaseCategoryUpdateWithoutCasesInputObjectSchema } from './CaseCategoryUpdateWithoutCasesInput.schema';
import { CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema as CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseCategoryUpsertWithoutCasesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CaseCategoryWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CaseCategoryWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseCategoryUpdateToOneWithWhereWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUpdateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema)]).optional()
}).strict();
export const CaseCategoryUpdateOneWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpdateOneWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpdateOneWithoutCasesNestedInput>;
export const CaseCategoryUpdateOneWithoutCasesNestedInputObjectZodSchema = makeSchema();
