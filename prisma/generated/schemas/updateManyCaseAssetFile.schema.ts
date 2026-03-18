import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileUpdateManyMutationInputObjectSchema as CaseAssetFileUpdateManyMutationInputObjectSchema } from './objects/CaseAssetFileUpdateManyMutationInput.schema';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './objects/CaseAssetFileWhereInput.schema';

export const CaseAssetFileUpdateManySchema: z.ZodType<Prisma.CaseAssetFileUpdateManyArgs> = z.object({ data: CaseAssetFileUpdateManyMutationInputObjectSchema, where: CaseAssetFileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateManyArgs>;

export const CaseAssetFileUpdateManyZodSchema = z.object({ data: CaseAssetFileUpdateManyMutationInputObjectSchema, where: CaseAssetFileWhereInputObjectSchema.optional() }).strict();