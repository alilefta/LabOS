import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './TechnicianWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => TechnicianWhereInputObjectSchema).optional(),
  some: z.lazy(() => TechnicianWhereInputObjectSchema).optional(),
  none: z.lazy(() => TechnicianWhereInputObjectSchema).optional()
}).strict();
export const TechnicianListRelationFilterObjectSchema: z.ZodType<Prisma.TechnicianListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianListRelationFilter>;
export const TechnicianListRelationFilterObjectZodSchema = makeSchema();
