import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './objects/CaseAssetFileWhereInput.schema';

export const CaseAssetFileDeleteManySchema: z.ZodType<Prisma.CaseAssetFileDeleteManyArgs> = z.object({ where: CaseAssetFileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileDeleteManyArgs>;

export const CaseAssetFileDeleteManyZodSchema = z.object({ where: CaseAssetFileWhereInputObjectSchema.optional() }).strict();