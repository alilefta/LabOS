import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeFindManySchema as WorkTypeFindManySchema } from '../findManyWorkType.schema';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseCategoryCountOutputTypeArgsObjectSchema as CaseCategoryCountOutputTypeArgsObjectSchema } from './CaseCategoryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  isActive: z.boolean().optional(),
  workTypes: z.union([z.boolean(), z.lazy(() => WorkTypeFindManySchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseCategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseCategorySelectObjectSchema: z.ZodType<Prisma.CaseCategorySelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategorySelect>;
export const CaseCategorySelectObjectZodSchema = makeSchema();
