import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileSelectObjectSchema as CaseAssetFileSelectObjectSchema } from './objects/CaseAssetFileSelect.schema';
import { CaseAssetFileIncludeObjectSchema as CaseAssetFileIncludeObjectSchema } from './objects/CaseAssetFileInclude.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './objects/CaseAssetFileWhereUniqueInput.schema';

export const CaseAssetFileDeleteOneSchema: z.ZodType<Prisma.CaseAssetFileDeleteArgs> = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), include: CaseAssetFileIncludeObjectSchema.optional(), where: CaseAssetFileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileDeleteArgs>;

export const CaseAssetFileDeleteOneZodSchema = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), include: CaseAssetFileIncludeObjectSchema.optional(), where: CaseAssetFileWhereUniqueInputObjectSchema }).strict();