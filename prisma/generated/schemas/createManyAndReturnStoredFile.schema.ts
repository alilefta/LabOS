import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileSelectObjectSchema as StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileCreateManyInputObjectSchema as StoredFileCreateManyInputObjectSchema } from './objects/StoredFileCreateManyInput.schema';

export const StoredFileCreateManyAndReturnSchema: z.ZodType<Prisma.StoredFileCreateManyAndReturnArgs> = z.object({ select: StoredFileSelectObjectSchema.optional(), data: z.union([ StoredFileCreateManyInputObjectSchema, z.array(StoredFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StoredFileCreateManyAndReturnArgs>;

export const StoredFileCreateManyAndReturnZodSchema = z.object({ select: StoredFileSelectObjectSchema.optional(), data: z.union([ StoredFileCreateManyInputObjectSchema, z.array(StoredFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();