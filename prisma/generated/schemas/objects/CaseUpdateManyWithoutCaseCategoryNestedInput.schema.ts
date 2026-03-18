import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutCaseCategoryInputObjectSchema as CaseCreateWithoutCaseCategoryInputObjectSchema } from './CaseCreateWithoutCaseCategoryInput.schema';
import { CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema as CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema } from './CaseUncheckedCreateWithoutCaseCategoryInput.schema';
import { CaseCreateOrConnectWithoutCaseCategoryInputObjectSchema as CaseCreateOrConnectWithoutCaseCategoryInputObjectSchema } from './CaseCreateOrConnectWithoutCaseCategoryInput.schema';
import { CaseUpsertWithWhereUniqueWithoutCaseCategoryInputObjectSchema as CaseUpsertWithWhereUniqueWithoutCaseCategoryInputObjectSchema } from './CaseUpsertWithWhereUniqueWithoutCaseCategoryInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithWhereUniqueWithoutCaseCategoryInputObjectSchema as CaseUpdateWithWhereUniqueWithoutCaseCategoryInputObjectSchema } from './CaseUpdateWithWhereUniqueWithoutCaseCategoryInput.schema';
import { CaseUpdateManyWithWhereWithoutCaseCategoryInputObjectSchema as CaseUpdateManyWithWhereWithoutCaseCategoryInputObjectSchema } from './CaseUpdateManyWithWhereWithoutCaseCategoryInput.schema';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseCreateWithoutCaseCategoryInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputObjectSchema), z.lazy(() => CaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseUpdateManyWithoutCaseCategoryNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithoutCaseCategoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithoutCaseCategoryNestedInput>;
export const CaseUpdateManyWithoutCaseCategoryNestedInputObjectZodSchema = makeSchema();
