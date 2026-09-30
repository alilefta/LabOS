import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileVersionSelectObjectSchema as CaseAssetFileVersionSelectObjectSchema } from './objects/CaseAssetFileVersionSelect.schema';
import { CaseAssetFileVersionIncludeObjectSchema as CaseAssetFileVersionIncludeObjectSchema } from './objects/CaseAssetFileVersionInclude.schema';
import { CaseAssetFileVersionCreateInputObjectSchema as CaseAssetFileVersionCreateInputObjectSchema } from './objects/CaseAssetFileVersionCreateInput.schema';
import { CaseAssetFileVersionUncheckedCreateInputObjectSchema as CaseAssetFileVersionUncheckedCreateInputObjectSchema } from './objects/CaseAssetFileVersionUncheckedCreateInput.schema';

export const CaseAssetFileVersionCreateOneSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateArgs> = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), include: CaseAssetFileVersionIncludeObjectSchema.optional(), data: z.union([CaseAssetFileVersionCreateInputObjectSchema, CaseAssetFileVersionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateArgs>;

export const CaseAssetFileVersionCreateOneZodSchema = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), include: CaseAssetFileVersionIncludeObjectSchema.optional(), data: z.union([CaseAssetFileVersionCreateInputObjectSchema, CaseAssetFileVersionUncheckedCreateInputObjectSchema]) }).strict();