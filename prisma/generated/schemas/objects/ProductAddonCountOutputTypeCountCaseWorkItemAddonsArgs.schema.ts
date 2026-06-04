import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereInputObjectSchema as CaseWorkItemAddonWhereInputObjectSchema } from './CaseWorkItemAddonWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonWhereInputObjectSchema).optional()
}).strict();
export const ProductAddonCountOutputTypeCountCaseWorkItemAddonsArgsObjectSchema = makeSchema();
export const ProductAddonCountOutputTypeCountCaseWorkItemAddonsArgsObjectZodSchema = makeSchema();
