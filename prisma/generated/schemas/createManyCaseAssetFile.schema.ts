import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileCreateManyInputObjectSchema as CaseAssetFileCreateManyInputObjectSchema } from './objects/CaseAssetFileCreateManyInput.schema';

export const CaseAssetFileCreateManySchema: z.ZodType<Prisma.CaseAssetFileCreateManyArgs> = z.object({ data: z.union([ CaseAssetFileCreateManyInputObjectSchema, z.array(CaseAssetFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileCreateManyArgs>;

export const CaseAssetFileCreateManyZodSchema = z.object({ data: z.union([ CaseAssetFileCreateManyInputObjectSchema, z.array(CaseAssetFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();