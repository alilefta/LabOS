import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { ClinicCountOutputTypeArgsObjectSchema as ClinicCountOutputTypeArgsObjectSchema } from './ClinicCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ClinicCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ClinicIncludeObjectSchema: z.ZodType<Prisma.ClinicInclude> = makeSchema() as unknown as z.ZodType<Prisma.ClinicInclude>;
export const ClinicIncludeObjectZodSchema = makeSchema();
