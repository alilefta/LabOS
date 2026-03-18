import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => LabWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabScalarRelationFilterObjectSchema: z.ZodType<Prisma.LabScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabScalarRelationFilter>;
export const LabScalarRelationFilterObjectZodSchema = makeSchema();
