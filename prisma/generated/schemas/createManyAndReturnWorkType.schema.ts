import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeSelectObjectSchema as WorkTypeSelectObjectSchema } from './objects/WorkTypeSelect.schema';
import { WorkTypeCreateManyInputObjectSchema as WorkTypeCreateManyInputObjectSchema } from './objects/WorkTypeCreateManyInput.schema';

export const WorkTypeCreateManyAndReturnSchema: z.ZodType<Prisma.WorkTypeCreateManyAndReturnArgs> = z.object({ select: WorkTypeSelectObjectSchema.optional(), data: z.union([ WorkTypeCreateManyInputObjectSchema, z.array(WorkTypeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.WorkTypeCreateManyAndReturnArgs>;

export const WorkTypeCreateManyAndReturnZodSchema = z.object({ select: WorkTypeSelectObjectSchema.optional(), data: z.union([ WorkTypeCreateManyInputObjectSchema, z.array(WorkTypeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();