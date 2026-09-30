import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './objects/CaseAssetFileVersionWhereInput.schema';

export const CaseAssetFileVersionDeleteManySchema: z.ZodType<Prisma.CaseAssetFileVersionDeleteManyArgs> = z.object({ where: CaseAssetFileVersionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionDeleteManyArgs>;

export const CaseAssetFileVersionDeleteManyZodSchema = z.object({ where: CaseAssetFileVersionWhereInputObjectSchema.optional() }).strict();