import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './DentistWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => DentistWhereInputObjectSchema).optional(),
  some: z.lazy(() => DentistWhereInputObjectSchema).optional(),
  none: z.lazy(() => DentistWhereInputObjectSchema).optional()
}).strict();
export const DentistListRelationFilterObjectSchema: z.ZodType<Prisma.DentistListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.DentistListRelationFilter>;
export const DentistListRelationFilterObjectZodSchema = makeSchema();
