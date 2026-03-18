import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileSelectObjectSchema as CaseAssetFileSelectObjectSchema } from './objects/CaseAssetFileSelect.schema';
import { CaseAssetFileCreateManyInputObjectSchema as CaseAssetFileCreateManyInputObjectSchema } from './objects/CaseAssetFileCreateManyInput.schema';

export const CaseAssetFileCreateManyAndReturnSchema: z.ZodType<Prisma.CaseAssetFileCreateManyAndReturnArgs> = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), data: z.union([ CaseAssetFileCreateManyInputObjectSchema, z.array(CaseAssetFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileCreateManyAndReturnArgs>;

export const CaseAssetFileCreateManyAndReturnZodSchema = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), data: z.union([ CaseAssetFileCreateManyInputObjectSchema, z.array(CaseAssetFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();