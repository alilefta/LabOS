import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema';
import { CaseUpdateManyMutationInputObjectSchema as CaseUpdateManyMutationInputObjectSchema } from './CaseUpdateManyMutationInput.schema';
import { CaseUncheckedUpdateManyWithoutCaseCategoryInputObjectSchema as CaseUncheckedUpdateManyWithoutCaseCategoryInputObjectSchema } from './CaseUncheckedUpdateManyWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateManyMutationInputObjectSchema), z.lazy(() => CaseUncheckedUpdateManyWithoutCaseCategoryInputObjectSchema)])
}).strict();
export const CaseUpdateManyWithWhereWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutCaseCategoryInput>;
export const CaseUpdateManyWithWhereWithoutCaseCategoryInputObjectZodSchema = makeSchema();
