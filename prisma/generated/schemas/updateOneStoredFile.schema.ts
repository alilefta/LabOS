import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileSelectObjectSchema as StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileIncludeObjectSchema as StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileUpdateInputObjectSchema as StoredFileUpdateInputObjectSchema } from './objects/StoredFileUpdateInput.schema';
import { StoredFileUncheckedUpdateInputObjectSchema as StoredFileUncheckedUpdateInputObjectSchema } from './objects/StoredFileUncheckedUpdateInput.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';

export const StoredFileUpdateOneSchema: z.ZodType<Prisma.StoredFileUpdateArgs> = z.object({ select: StoredFileSelectObjectSchema.optional(), include: StoredFileIncludeObjectSchema.optional(), data: z.union([StoredFileUpdateInputObjectSchema, StoredFileUncheckedUpdateInputObjectSchema]), where: StoredFileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StoredFileUpdateArgs>;

export const StoredFileUpdateOneZodSchema = z.object({ select: StoredFileSelectObjectSchema.optional(), include: StoredFileIncludeObjectSchema.optional(), data: z.union([StoredFileUpdateInputObjectSchema, StoredFileUncheckedUpdateInputObjectSchema]), where: StoredFileWhereUniqueInputObjectSchema }).strict();