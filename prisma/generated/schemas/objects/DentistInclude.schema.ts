import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicArgsObjectSchema as ClinicArgsObjectSchema } from './ClinicArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { DentistCountOutputTypeArgsObjectSchema as DentistCountOutputTypeArgsObjectSchema } from './DentistCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  clinic: z.union([z.boolean(), z.lazy(() => ClinicArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => DentistCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const DentistIncludeObjectSchema: z.ZodType<Prisma.DentistInclude> = makeSchema() as unknown as z.ZodType<Prisma.DentistInclude>;
export const DentistIncludeObjectZodSchema = makeSchema();
