import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileVersionSelectObjectSchema as CaseAssetFileVersionSelectObjectSchema } from './objects/CaseAssetFileVersionSelect.schema';
import { CaseAssetFileVersionUpdateManyMutationInputObjectSchema as CaseAssetFileVersionUpdateManyMutationInputObjectSchema } from './objects/CaseAssetFileVersionUpdateManyMutationInput.schema';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './objects/CaseAssetFileVersionWhereInput.schema';

export const CaseAssetFileVersionUpdateManyAndReturnSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateManyAndReturnArgs> = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), data: CaseAssetFileVersionUpdateManyMutationInputObjectSchema, where: CaseAssetFileVersionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateManyAndReturnArgs>;

export const CaseAssetFileVersionUpdateManyAndReturnZodSchema = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), data: CaseAssetFileVersionUpdateManyMutationInputObjectSchema, where: CaseAssetFileVersionWhereInputObjectSchema.optional() }).strict();