import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { PatientCountOutputTypeArgsObjectSchema as PatientCountOutputTypeArgsObjectSchema } from './PatientCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  case: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PatientCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PatientIncludeObjectSchema: z.ZodType<Prisma.PatientInclude> = makeSchema() as unknown as z.ZodType<Prisma.PatientInclude>;
export const PatientIncludeObjectZodSchema = makeSchema();
