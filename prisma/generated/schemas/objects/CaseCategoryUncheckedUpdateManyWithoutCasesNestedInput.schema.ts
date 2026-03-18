import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCreateWithoutCasesInputObjectSchema as CaseCategoryCreateWithoutCasesInputObjectSchema } from './CaseCategoryCreateWithoutCasesInput.schema';
import { CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema as CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutCasesInput.schema';
import { CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema as CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema } from './CaseCategoryCreateOrConnectWithoutCasesInput.schema';
import { CaseCategoryUpsertWithWhereUniqueWithoutCasesInputObjectSchema as CaseCategoryUpsertWithWhereUniqueWithoutCasesInputObjectSchema } from './CaseCategoryUpsertWithWhereUniqueWithoutCasesInput.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryUpdateWithWhereUniqueWithoutCasesInputObjectSchema as CaseCategoryUpdateWithWhereUniqueWithoutCasesInputObjectSchema } from './CaseCategoryUpdateWithWhereUniqueWithoutCasesInput.schema';
import { CaseCategoryUpdateManyWithWhereWithoutCasesInputObjectSchema as CaseCategoryUpdateManyWithWhereWithoutCasesInputObjectSchema } from './CaseCategoryUpdateManyWithWhereWithoutCasesInput.schema';
import { CaseCategoryScalarWhereInputObjectSchema as CaseCategoryScalarWhereInputObjectSchema } from './CaseCategoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryCreateWithoutCasesInputObjectSchema).array(), z.lazy(() => CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryCreateOrConnectWithoutCasesInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseCategoryUpsertWithWhereUniqueWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUpsertWithWhereUniqueWithoutCasesInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema), z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema), z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema), z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema), z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseCategoryUpdateWithWhereUniqueWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUpdateWithWhereUniqueWithoutCasesInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseCategoryUpdateManyWithWhereWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUpdateManyWithWhereWithoutCasesInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseCategoryScalarWhereInputObjectSchema), z.lazy(() => CaseCategoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseCategoryUncheckedUpdateManyWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.CaseCategoryUncheckedUpdateManyWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUncheckedUpdateManyWithoutCasesNestedInput>;
export const CaseCategoryUncheckedUpdateManyWithoutCasesNestedInputObjectZodSchema = makeSchema();
