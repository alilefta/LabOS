import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCreateWithoutWorkTypesInputObjectSchema as CaseCategoryCreateWithoutWorkTypesInputObjectSchema } from './CaseCategoryCreateWithoutWorkTypesInput.schema';
import { CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema as CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutWorkTypesInput.schema';
import { CaseCategoryCreateOrConnectWithoutWorkTypesInputObjectSchema as CaseCategoryCreateOrConnectWithoutWorkTypesInputObjectSchema } from './CaseCategoryCreateOrConnectWithoutWorkTypesInput.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutWorkTypesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCategoryCreateOrConnectWithoutWorkTypesInputObjectSchema).optional(),
  connect: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.CaseCategoryCreateNestedOneWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateNestedOneWithoutWorkTypesInput>;
export const CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectZodSchema = makeSchema();
