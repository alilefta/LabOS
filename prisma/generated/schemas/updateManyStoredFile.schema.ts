import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileUpdateManyMutationInputObjectSchema as StoredFileUpdateManyMutationInputObjectSchema } from './objects/StoredFileUpdateManyMutationInput.schema';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './objects/StoredFileWhereInput.schema';

export const StoredFileUpdateManySchema: z.ZodType<Prisma.StoredFileUpdateManyArgs> = z.object({ data: StoredFileUpdateManyMutationInputObjectSchema, where: StoredFileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StoredFileUpdateManyArgs>;

export const StoredFileUpdateManyZodSchema = z.object({ data: StoredFileUpdateManyMutationInputObjectSchema, where: StoredFileWhereInputObjectSchema.optional() }).strict();