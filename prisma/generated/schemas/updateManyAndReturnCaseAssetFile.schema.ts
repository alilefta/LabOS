import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileSelectObjectSchema as CaseAssetFileSelectObjectSchema } from './objects/CaseAssetFileSelect.schema';
import { CaseAssetFileUpdateManyMutationInputObjectSchema as CaseAssetFileUpdateManyMutationInputObjectSchema } from './objects/CaseAssetFileUpdateManyMutationInput.schema';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './objects/CaseAssetFileWhereInput.schema';

export const CaseAssetFileUpdateManyAndReturnSchema: z.ZodType<Prisma.CaseAssetFileUpdateManyAndReturnArgs> = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), data: CaseAssetFileUpdateManyMutationInputObjectSchema, where: CaseAssetFileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateManyAndReturnArgs>;

export const CaseAssetFileUpdateManyAndReturnZodSchema = z.object({ select: CaseAssetFileSelectObjectSchema.optional(), data: CaseAssetFileUpdateManyMutationInputObjectSchema, where: CaseAssetFileWhereInputObjectSchema.optional() }).strict();