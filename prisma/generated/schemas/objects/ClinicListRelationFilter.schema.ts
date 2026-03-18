import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ClinicWhereInputObjectSchema).optional(),
  some: z.lazy(() => ClinicWhereInputObjectSchema).optional(),
  none: z.lazy(() => ClinicWhereInputObjectSchema).optional()
}).strict();
export const ClinicListRelationFilterObjectSchema: z.ZodType<Prisma.ClinicListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ClinicListRelationFilter>;
export const ClinicListRelationFilterObjectZodSchema = makeSchema();
