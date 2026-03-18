import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCreateWithoutLabInputObjectSchema as CaseCategoryCreateWithoutLabInputObjectSchema } from './CaseCategoryCreateWithoutLabInput.schema';
import { CaseCategoryUncheckedCreateWithoutLabInputObjectSchema as CaseCategoryUncheckedCreateWithoutLabInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutLabInput.schema';
import { CaseCategoryCreateOrConnectWithoutLabInputObjectSchema as CaseCategoryCreateOrConnectWithoutLabInputObjectSchema } from './CaseCategoryCreateOrConnectWithoutLabInput.schema';
import { CaseCategoryCreateManyLabInputEnvelopeObjectSchema as CaseCategoryCreateManyLabInputEnvelopeObjectSchema } from './CaseCategoryCreateManyLabInputEnvelope.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseCategoryUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCategoryCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCategoryCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema), z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseCategoryCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseCategoryCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateNestedManyWithoutLabInput>;
export const CaseCategoryCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
