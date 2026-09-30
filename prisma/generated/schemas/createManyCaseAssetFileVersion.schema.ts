import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileVersionCreateManyInputObjectSchema as CaseAssetFileVersionCreateManyInputObjectSchema } from './objects/CaseAssetFileVersionCreateManyInput.schema';

export const CaseAssetFileVersionCreateManySchema: z.ZodType<Prisma.CaseAssetFileVersionCreateManyArgs> = z.object({ data: z.union([ CaseAssetFileVersionCreateManyInputObjectSchema, z.array(CaseAssetFileVersionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateManyArgs>;

export const CaseAssetFileVersionCreateManyZodSchema = z.object({ data: z.union([ CaseAssetFileVersionCreateManyInputObjectSchema, z.array(CaseAssetFileVersionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();