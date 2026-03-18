import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeCreateManyInputObjectSchema as WorkTypeCreateManyInputObjectSchema } from './objects/WorkTypeCreateManyInput.schema';

export const WorkTypeCreateManySchema: z.ZodType<Prisma.WorkTypeCreateManyArgs> = z.object({ data: z.union([ WorkTypeCreateManyInputObjectSchema, z.array(WorkTypeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.WorkTypeCreateManyArgs>;

export const WorkTypeCreateManyZodSchema = z.object({ data: z.union([ WorkTypeCreateManyInputObjectSchema, z.array(WorkTypeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();