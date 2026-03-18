import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileSelectObjectSchema as CaseAssetFileSelectObjectSchema } from './objects/CaseAssetFileSelect.schema';
import { CaseAssetFileIncludeObjectSchema as CaseAssetFileIncludeObjectSchema } from './objects/CaseAssetFileInclude.schema';
import { CaseAssetFileCreateInputObjectSchema as CaseAssetFileCreateInputObjectSchema } from './objects/CaseAssetFileCreateInput.schema';
import { CaseAssetFileUncheckedCreateInputObjectSchema as CaseAssetFileUncheckedCreateInputObjectSchema } from './objects/CaseAssetFileUncheckedCreateInput.schema';

export const CaseAssetFileCreateOneSchema: z.ZodType<Prisma.CaseAssetFileCreateArgs> = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), include: CaseAssetFileIncludeObjectSchema.optional(), data: z.union([CaseAssetFileCreateInputObjectSchema, CaseAssetFileUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileCreateArgs>;

export const CaseAssetFileCreateOneZodSchema = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), include: CaseAssetFileIncludeObjectSchema.optional(), data: z.union([CaseAssetFileCreateInputObjectSchema, CaseAssetFileUncheckedCreateInputObjectSchema]) }).strict();