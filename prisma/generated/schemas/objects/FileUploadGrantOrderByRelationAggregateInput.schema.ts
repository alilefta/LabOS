import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const FileUploadGrantOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.FileUploadGrantOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantOrderByRelationAggregateInput>;
export const FileUploadGrantOrderByRelationAggregateInputObjectZodSchema = makeSchema();
