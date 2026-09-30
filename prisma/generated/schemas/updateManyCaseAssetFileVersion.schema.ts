import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileVersionUpdateManyMutationInputObjectSchema as CaseAssetFileVersionUpdateManyMutationInputObjectSchema } from './objects/CaseAssetFileVersionUpdateManyMutationInput.schema';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './objects/CaseAssetFileVersionWhereInput.schema';

export const CaseAssetFileVersionUpdateManySchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateManyArgs> = z.object({ data: CaseAssetFileVersionUpdateManyMutationInputObjectSchema, where: CaseAssetFileVersionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateManyArgs>;

export const CaseAssetFileVersionUpdateManyZodSchema = z.object({ data: CaseAssetFileVersionUpdateManyMutationInputObjectSchema, where: CaseAssetFileVersionWhereInputObjectSchema.optional() }).strict();