import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileVersionSelectObjectSchema as CaseAssetFileVersionSelectObjectSchema } from './objects/CaseAssetFileVersionSelect.schema';
import { CaseAssetFileVersionIncludeObjectSchema as CaseAssetFileVersionIncludeObjectSchema } from './objects/CaseAssetFileVersionInclude.schema';
import { CaseAssetFileVersionUpdateInputObjectSchema as CaseAssetFileVersionUpdateInputObjectSchema } from './objects/CaseAssetFileVersionUpdateInput.schema';
import { CaseAssetFileVersionUncheckedUpdateInputObjectSchema as CaseAssetFileVersionUncheckedUpdateInputObjectSchema } from './objects/CaseAssetFileVersionUncheckedUpdateInput.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './objects/CaseAssetFileVersionWhereUniqueInput.schema';

export const CaseAssetFileVersionUpdateOneSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateArgs> = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), include: CaseAssetFileVersionIncludeObjectSchema.optional(), data: z.union([CaseAssetFileVersionUpdateInputObjectSchema, CaseAssetFileVersionUncheckedUpdateInputObjectSchema]), where: CaseAssetFileVersionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateArgs>;

export const CaseAssetFileVersionUpdateOneZodSchema = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), include: CaseAssetFileVersionIncludeObjectSchema.optional(), data: z.union([CaseAssetFileVersionUpdateInputObjectSchema, CaseAssetFileVersionUncheckedUpdateInputObjectSchema]), where: CaseAssetFileVersionWhereUniqueInputObjectSchema }).strict();