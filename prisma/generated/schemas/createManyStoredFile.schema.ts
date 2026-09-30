import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileCreateManyInputObjectSchema as StoredFileCreateManyInputObjectSchema } from './objects/StoredFileCreateManyInput.schema';

export const StoredFileCreateManySchema: z.ZodType<Prisma.StoredFileCreateManyArgs> = z.object({ data: z.union([ StoredFileCreateManyInputObjectSchema, z.array(StoredFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StoredFileCreateManyArgs>;

export const StoredFileCreateManyZodSchema = z.object({ data: z.union([ StoredFileCreateManyInputObjectSchema, z.array(StoredFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();