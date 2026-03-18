import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutCaseCategoryInputObjectSchema as CaseCreateWithoutCaseCategoryInputObjectSchema } from './CaseCreateWithoutCaseCategoryInput.schema';
import { CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema as CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema } from './CaseUncheckedCreateWithoutCaseCategoryInput.schema';
import { CaseCreateOrConnectWithoutCaseCategoryInputObjectSchema as CaseCreateOrConnectWithoutCaseCategoryInputObjectSchema } from './CaseCreateOrConnectWithoutCaseCategoryInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseCreateWithoutCaseCategoryInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseCreateNestedManyWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedManyWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedManyWithoutCaseCategoryInput>;
export const CaseCreateNestedManyWithoutCaseCategoryInputObjectZodSchema = makeSchema();
