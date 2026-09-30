import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileSelectObjectSchema as StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileUpdateManyMutationInputObjectSchema as StoredFileUpdateManyMutationInputObjectSchema } from './objects/StoredFileUpdateManyMutationInput.schema';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './objects/StoredFileWhereInput.schema';

export const StoredFileUpdateManyAndReturnSchema: z.ZodType<Prisma.StoredFileUpdateManyAndReturnArgs> = z.object({ select: StoredFileSelectObjectSchema.optional(), data: StoredFileUpdateManyMutationInputObjectSchema, where: StoredFileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StoredFileUpdateManyAndReturnArgs>;

export const StoredFileUpdateManyAndReturnZodSchema = z.object({ select: StoredFileSelectObjectSchema.optional(), data: StoredFileUpdateManyMutationInputObjectSchema, where: StoredFileWhereInputObjectSchema.optional() }).strict();