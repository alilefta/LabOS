import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCreateWithoutWorkTypesInputObjectSchema as CaseCategoryCreateWithoutWorkTypesInputObjectSchema } from './CaseCategoryCreateWithoutWorkTypesInput.schema';
import { CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema as CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutWorkTypesInput.schema';
import { CaseCategoryCreateOrConnectWithoutWorkTypesInputObjectSchema as CaseCategoryCreateOrConnectWithoutWorkTypesInputObjectSchema } from './CaseCategoryCreateOrConnectWithoutWorkTypesInput.schema';
import { CaseCategoryUpsertWithoutWorkTypesInputObjectSchema as CaseCategoryUpsertWithoutWorkTypesInputObjectSchema } from './CaseCategoryUpsertWithoutWorkTypesInput.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryUpdateToOneWithWhereWithoutWorkTypesInputObjectSchema as CaseCategoryUpdateToOneWithWhereWithoutWorkTypesInputObjectSchema } from './CaseCategoryUpdateToOneWithWhereWithoutWorkTypesInput.schema';
import { CaseCategoryUpdateWithoutWorkTypesInputObjectSchema as CaseCategoryUpdateWithoutWorkTypesInputObjectSchema } from './CaseCategoryUpdateWithoutWorkTypesInput.schema';
import { CaseCategoryUncheckedUpdateWithoutWorkTypesInputObjectSchema as CaseCategoryUncheckedUpdateWithoutWorkTypesInputObjectSchema } from './CaseCategoryUncheckedUpdateWithoutWorkTypesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutWorkTypesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCategoryCreateOrConnectWithoutWorkTypesInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseCategoryUpsertWithoutWorkTypesInputObjectSchema).optional(),
  connect: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseCategoryUpdateToOneWithWhereWithoutWorkTypesInputObjectSchema), z.lazy(() => CaseCategoryUpdateWithoutWorkTypesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateWithoutWorkTypesInputObjectSchema)]).optional()
}).strict();
export const CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInput>;
export const CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInputObjectZodSchema = makeSchema();
