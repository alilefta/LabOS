import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './PatientWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PatientWhereInputObjectSchema).optional(),
  some: z.lazy(() => PatientWhereInputObjectSchema).optional(),
  none: z.lazy(() => PatientWhereInputObjectSchema).optional()
}).strict();
export const PatientListRelationFilterObjectSchema: z.ZodType<Prisma.PatientListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PatientListRelationFilter>;
export const PatientListRelationFilterObjectZodSchema = makeSchema();
