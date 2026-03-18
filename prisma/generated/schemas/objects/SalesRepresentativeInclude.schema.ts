import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { SalesRepresentativeCountOutputTypeArgsObjectSchema as SalesRepresentativeCountOutputTypeArgsObjectSchema } from './SalesRepresentativeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => SalesRepresentativeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const SalesRepresentativeIncludeObjectSchema: z.ZodType<Prisma.SalesRepresentativeInclude> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeInclude>;
export const SalesRepresentativeIncludeObjectZodSchema = makeSchema();
