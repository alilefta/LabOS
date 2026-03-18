import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { TechnicianCountOutputTypeArgsObjectSchema as TechnicianCountOutputTypeArgsObjectSchema } from './TechnicianCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => TechnicianCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const TechnicianIncludeObjectSchema: z.ZodType<Prisma.TechnicianInclude> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianInclude>;
export const TechnicianIncludeObjectZodSchema = makeSchema();
