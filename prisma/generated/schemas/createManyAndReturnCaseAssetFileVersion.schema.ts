import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileVersionSelectObjectSchema as CaseAssetFileVersionSelectObjectSchema } from './objects/CaseAssetFileVersionSelect.schema';
import { CaseAssetFileVersionCreateManyInputObjectSchema as CaseAssetFileVersionCreateManyInputObjectSchema } from './objects/CaseAssetFileVersionCreateManyInput.schema';

export const CaseAssetFileVersionCreateManyAndReturnSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateManyAndReturnArgs> = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), data: z.union([ CaseAssetFileVersionCreateManyInputObjectSchema, z.array(CaseAssetFileVersionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateManyAndReturnArgs>;

export const CaseAssetFileVersionCreateManyAndReturnZodSchema = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), data: z.union([ CaseAssetFileVersionCreateManyInputObjectSchema, z.array(CaseAssetFileVersionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();