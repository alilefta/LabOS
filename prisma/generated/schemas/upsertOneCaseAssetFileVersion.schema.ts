import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileVersionSelectObjectSchema as CaseAssetFileVersionSelectObjectSchema } from './objects/CaseAssetFileVersionSelect.schema';
import { CaseAssetFileVersionIncludeObjectSchema as CaseAssetFileVersionIncludeObjectSchema } from './objects/CaseAssetFileVersionInclude.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './objects/CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionCreateInputObjectSchema as CaseAssetFileVersionCreateInputObjectSchema } from './objects/CaseAssetFileVersionCreateInput.schema';
import { CaseAssetFileVersionUncheckedCreateInputObjectSchema as CaseAssetFileVersionUncheckedCreateInputObjectSchema } from './objects/CaseAssetFileVersionUncheckedCreateInput.schema';
import { CaseAssetFileVersionUpdateInputObjectSchema as CaseAssetFileVersionUpdateInputObjectSchema } from './objects/CaseAssetFileVersionUpdateInput.schema';
import { CaseAssetFileVersionUncheckedUpdateInputObjectSchema as CaseAssetFileVersionUncheckedUpdateInputObjectSchema } from './objects/CaseAssetFileVersionUncheckedUpdateInput.schema';

export const CaseAssetFileVersionUpsertOneSchema: z.ZodType<Prisma.CaseAssetFileVersionUpsertArgs> = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), include: CaseAssetFileVersionIncludeObjectSchema.optional(), where: CaseAssetFileVersionWhereUniqueInputObjectSchema, create: z.union([ CaseAssetFileVersionCreateInputObjectSchema, CaseAssetFileVersionUncheckedCreateInputObjectSchema ]), update: z.union([ CaseAssetFileVersionUpdateInputObjectSchema, CaseAssetFileVersionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpsertArgs>;

export const CaseAssetFileVersionUpsertOneZodSchema = z.object({ select: CaseAssetFileVersionSelectObjectSchema.optional(), include: CaseAssetFileVersionIncludeObjectSchema.optional(), where: CaseAssetFileVersionWhereUniqueInputObjectSchema, create: z.union([ CaseAssetFileVersionCreateInputObjectSchema, CaseAssetFileVersionUncheckedCreateInputObjectSchema ]), update: z.union([ CaseAssetFileVersionUpdateInputObjectSchema, CaseAssetFileVersionUncheckedUpdateInputObjectSchema ]) }).strict();