import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCreateWithoutLabInputObjectSchema as CaseCategoryCreateWithoutLabInputObjectSchema } from './CaseCategoryCreateWithoutLabInput.schema';
import { CaseCategoryUncheckedCreateWithoutLabInputObjectSchema as CaseCategoryUncheckedCreateWithoutLabInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutLabInput.schema';
import { CaseCategoryCreateOrConnectWithoutLabInputObjectSchema as CaseCategoryCreateOrConnectWithoutLabInputObjectSchema } from './CaseCategoryCreateOrConnectWithoutLabInput.schema';
import { CaseCategoryUpsertWithWhereUniqueWithoutLabInputObjectSchema as CaseCategoryUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './CaseCategoryUpsertWithWhereUniqueWithoutLabInput.schema';
import { CaseCategoryCreateManyLabInputEnvelopeObjectSchema as CaseCategoryCreateManyLabInputEnvelopeObjectSchema } from './CaseCategoryCreateManyLabInputEnvelope.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryUpdateWithWhereUniqueWithoutLabInputObjectSchema as CaseCategoryUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './CaseCategoryUpdateWithWhereUniqueWithoutLabInput.schema';
import { CaseCategoryUpdateManyWithWhereWithoutLabInputObjectSchema as CaseCategoryUpdateManyWithWhereWithoutLabInputObjectSchema } from './CaseCategoryUpdateManyWithWhereWithoutLabInput.schema';
import { CaseCategoryScalarWhereInputObjectSchema as CaseCategoryScalarWhereInputObjectSchema } from './CaseCategoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseCategoryUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCategoryCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseCategoryUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCategoryCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema), z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema), z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema), z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema), z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseCategoryUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseCategoryUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseCategoryScalarWhereInputObjectSchema), z.lazy(() => CaseCategoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseCategoryUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.CaseCategoryUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUncheckedUpdateManyWithoutLabNestedInput>;
export const CaseCategoryUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
