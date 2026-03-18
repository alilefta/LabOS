import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothWhereInputObjectSchema as SelectedToothWhereInputObjectSchema } from './SelectedToothWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => SelectedToothWhereInputObjectSchema).optional(),
  some: z.lazy(() => SelectedToothWhereInputObjectSchema).optional(),
  none: z.lazy(() => SelectedToothWhereInputObjectSchema).optional()
}).strict();
export const SelectedToothListRelationFilterObjectSchema: z.ZodType<Prisma.SelectedToothListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothListRelationFilter>;
export const SelectedToothListRelationFilterObjectZodSchema = makeSchema();
