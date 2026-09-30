import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileVersionSelectObjectSchema as CaseAssetFileVersionSelectObjectSchema } from './objects/CaseAssetFileVersionSelect.schema';
import { CaseAssetFileVersionIncludeObjectSchema as CaseAssetFileVersionIncludeObjectSchema } from './objects/CaseAssetFileVersionInclude.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './objects/CaseAssetFileVersionWhereUniqueInput.schema';

export const CaseAssetFileVersionFindUniqueOrThrowSchema: z.ZodType<Prisma.CaseAssetFileVersionFindUniqueOrThrowArgs> = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), include: CaseAssetFileVersionIncludeObjectSchema.optional(), where: CaseAssetFileVersionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionFindUniqueOrThrowArgs>;

export const CaseAssetFileVersionFindUniqueOrThrowZodSchema = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), include: CaseAssetFileVersionIncludeObjectSchema.optional(), where: CaseAssetFileVersionWhereUniqueInputObjectSchema }).strict();