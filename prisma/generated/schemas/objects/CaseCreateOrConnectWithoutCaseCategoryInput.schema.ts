import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutCaseCategoryInputObjectSchema as CaseCreateWithoutCaseCategoryInputObjectSchema } from './CaseCreateWithoutCaseCategoryInput.schema';
import { CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema as CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema } from './CaseUncheckedCreateWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseCategoryInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutCaseCategoryInput>;
export const CaseCreateOrConnectWithoutCaseCategoryInputObjectZodSchema = makeSchema();
