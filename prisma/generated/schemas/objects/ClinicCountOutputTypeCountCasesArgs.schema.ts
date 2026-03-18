import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const ClinicCountOutputTypeCountCasesArgsObjectSchema = makeSchema();
export const ClinicCountOutputTypeCountCasesArgsObjectZodSchema = makeSchema();
