import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCountOutputTypeCountWorkTypesArgsObjectSchema as CaseCategoryCountOutputTypeCountWorkTypesArgsObjectSchema } from './CaseCategoryCountOutputTypeCountWorkTypesArgs.schema';
import { CaseCategoryCountOutputTypeCountCasesArgsObjectSchema as CaseCategoryCountOutputTypeCountCasesArgsObjectSchema } from './CaseCategoryCountOutputTypeCountCasesArgs.schema'

const makeSchema = () => z.object({
  workTypes: z.union([z.boolean(), z.lazy(() => CaseCategoryCountOutputTypeCountWorkTypesArgsObjectSchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseCategoryCountOutputTypeCountCasesArgsObjectSchema)]).optional()
}).strict();
export const CaseCategoryCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CaseCategoryCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCountOutputTypeSelect>;
export const CaseCategoryCountOutputTypeSelectObjectZodSchema = makeSchema();
