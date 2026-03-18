import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileSelectObjectSchema as CaseAssetFileSelectObjectSchema } from './objects/CaseAssetFileSelect.schema';
import { CaseAssetFileIncludeObjectSchema as CaseAssetFileIncludeObjectSchema } from './objects/CaseAssetFileInclude.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './objects/CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileCreateInputObjectSchema as CaseAssetFileCreateInputObjectSchema } from './objects/CaseAssetFileCreateInput.schema';
import { CaseAssetFileUncheckedCreateInputObjectSchema as CaseAssetFileUncheckedCreateInputObjectSchema } from './objects/CaseAssetFileUncheckedCreateInput.schema';
import { CaseAssetFileUpdateInputObjectSchema as CaseAssetFileUpdateInputObjectSchema } from './objects/CaseAssetFileUpdateInput.schema';
import { CaseAssetFileUncheckedUpdateInputObjectSchema as CaseAssetFileUncheckedUpdateInputObjectSchema } from './objects/CaseAssetFileUncheckedUpdateInput.schema';

export const CaseAssetFileUpsertOneSchema: z.ZodType<Prisma.CaseAssetFileUpsertArgs> = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), include: CaseAssetFileIncludeObjectSchema.optional(), where: CaseAssetFileWhereUniqueInputObjectSchema, create: z.union([ CaseAssetFileCreateInputObjectSchema, CaseAssetFileUncheckedCreateInputObjectSchema ]), update: z.union([ CaseAssetFileUpdateInputObjectSchema, CaseAssetFileUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileUpsertArgs>;

export const CaseAssetFileUpsertOneZodSchema = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), include: CaseAssetFileIncludeObjectSchema.optional(), where: CaseAssetFileWhereUniqueInputObjectSchema, create: z.union([ CaseAssetFileCreateInputObjectSchema, CaseAssetFileUncheckedCreateInputObjectSchema ]), update: z.union([ CaseAssetFileUpdateInputObjectSchema, CaseAssetFileUncheckedUpdateInputObjectSchema ]) }).strict();