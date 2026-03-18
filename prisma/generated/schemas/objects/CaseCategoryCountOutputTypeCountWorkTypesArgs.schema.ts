import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereInputObjectSchema).optional()
}).strict();
export const CaseCategoryCountOutputTypeCountWorkTypesArgsObjectSchema = makeSchema();
export const CaseCategoryCountOutputTypeCountWorkTypesArgsObjectZodSchema = makeSchema();
