import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './CaseWorkItemWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereInputObjectSchema).optional()
}).strict();
export const WorkTypeCountOutputTypeCountCaseWorkItemsArgsObjectSchema = makeSchema();
export const WorkTypeCountOutputTypeCountCaseWorkItemsArgsObjectZodSchema = makeSchema();
