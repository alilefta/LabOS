import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileSelectObjectSchema as CaseAssetFileSelectObjectSchema } from './objects/CaseAssetFileSelect.schema';
import { CaseAssetFileIncludeObjectSchema as CaseAssetFileIncludeObjectSchema } from './objects/CaseAssetFileInclude.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './objects/CaseAssetFileWhereUniqueInput.schema';

export const CaseAssetFileFindUniqueOrThrowSchema: z.ZodType<Prisma.CaseAssetFileFindUniqueOrThrowArgs> = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), include: CaseAssetFileIncludeObjectSchema.optional(), where: CaseAssetFileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileFindUniqueOrThrowArgs>;

export const CaseAssetFileFindUniqueOrThrowZodSchema = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), include: CaseAssetFileIncludeObjectSchema.optional(), where: CaseAssetFileWhereUniqueInputObjectSchema }).strict();