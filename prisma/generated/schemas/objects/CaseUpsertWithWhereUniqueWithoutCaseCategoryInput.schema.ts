import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutCaseCategoryInputObjectSchema as CaseUpdateWithoutCaseCategoryInputObjectSchema } from './CaseUpdateWithoutCaseCategoryInput.schema';
import { CaseUncheckedUpdateWithoutCaseCategoryInputObjectSchema as CaseUncheckedUpdateWithoutCaseCategoryInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseCategoryInput.schema';
import { CaseCreateWithoutCaseCategoryInputObjectSchema as CaseCreateWithoutCaseCategoryInputObjectSchema } from './CaseCreateWithoutCaseCategoryInput.schema';
import { CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema as CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema } from './CaseUncheckedCreateWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseUpdateWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseCategoryInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema)])
}).strict();
export const CaseUpsertWithWhereUniqueWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutCaseCategoryInput>;
export const CaseUpsertWithWhereUniqueWithoutCaseCategoryInputObjectZodSchema = makeSchema();
