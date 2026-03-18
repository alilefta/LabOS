import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountCaseCategoriesArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountCaseCategoriesArgsObjectZodSchema = makeSchema();
