import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileSelectObjectSchema as CaseAssetFileSelectObjectSchema } from './objects/CaseAssetFileSelect.schema';
import { CaseAssetFileIncludeObjectSchema as CaseAssetFileIncludeObjectSchema } from './objects/CaseAssetFileInclude.schema';
import { CaseAssetFileUpdateInputObjectSchema as CaseAssetFileUpdateInputObjectSchema } from './objects/CaseAssetFileUpdateInput.schema';
import { CaseAssetFileUncheckedUpdateInputObjectSchema as CaseAssetFileUncheckedUpdateInputObjectSchema } from './objects/CaseAssetFileUncheckedUpdateInput.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './objects/CaseAssetFileWhereUniqueInput.schema';

export const CaseAssetFileUpdateOneSchema: z.ZodType<Prisma.CaseAssetFileUpdateArgs> = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), include: CaseAssetFileIncludeObjectSchema.optional(), data: z.union([CaseAssetFileUpdateInputObjectSchema, CaseAssetFileUncheckedUpdateInputObjectSchema]), where: CaseAssetFileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateArgs>;

export const CaseAssetFileUpdateOneZodSchema = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), include: CaseAssetFileIncludeObjectSchema.optional(), data: z.union([CaseAssetFileUpdateInputObjectSchema, CaseAssetFileUncheckedUpdateInputObjectSchema]), where: CaseAssetFileWhereUniqueInputObjectSchema }).strict();