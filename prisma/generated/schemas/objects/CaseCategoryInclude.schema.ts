import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeFindManySchema as WorkTypeFindManySchema } from '../findManyWorkType.schema';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseCategoryCountOutputTypeArgsObjectSchema as CaseCategoryCountOutputTypeArgsObjectSchema } from './CaseCategoryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  workTypes: z.union([z.boolean(), z.lazy(() => WorkTypeFindManySchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseCategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseCategoryIncludeObjectSchema: z.ZodType<Prisma.CaseCategoryInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryInclude>;
export const CaseCategoryIncludeObjectZodSchema = makeSchema();
