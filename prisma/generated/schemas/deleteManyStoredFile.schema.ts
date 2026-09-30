import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './objects/StoredFileWhereInput.schema';

export const StoredFileDeleteManySchema: z.ZodType<Prisma.StoredFileDeleteManyArgs> = z.object({ where: StoredFileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StoredFileDeleteManyArgs>;

export const StoredFileDeleteManyZodSchema = z.object({ where: StoredFileWhereInputObjectSchema.optional() }).strict();