import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileSelectObjectSchema as StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileIncludeObjectSchema as StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';
import { StoredFileCreateInputObjectSchema as StoredFileCreateInputObjectSchema } from './objects/StoredFileCreateInput.schema';
import { StoredFileUncheckedCreateInputObjectSchema as StoredFileUncheckedCreateInputObjectSchema } from './objects/StoredFileUncheckedCreateInput.schema';
import { StoredFileUpdateInputObjectSchema as StoredFileUpdateInputObjectSchema } from './objects/StoredFileUpdateInput.schema';
import { StoredFileUncheckedUpdateInputObjectSchema as StoredFileUncheckedUpdateInputObjectSchema } from './objects/StoredFileUncheckedUpdateInput.schema';

export const StoredFileUpsertOneSchema: z.ZodType<Prisma.StoredFileUpsertArgs> = z.object({ select: StoredFileSelectObjectSchema.optional(), include: StoredFileIncludeObjectSchema.optional(), where: StoredFileWhereUniqueInputObjectSchema, create: z.union([ StoredFileCreateInputObjectSchema, StoredFileUncheckedCreateInputObjectSchema ]), update: z.union([ StoredFileUpdateInputObjectSchema, StoredFileUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.StoredFileUpsertArgs>;

export const StoredFileUpsertOneZodSchema = z.object({ select: StoredFileSelectObjectSchema.optional(), include: StoredFileIncludeObjectSchema.optional(), where: StoredFileWhereUniqueInputObjectSchema, create: z.union([ StoredFileCreateInputObjectSchema, StoredFileUncheckedCreateInputObjectSchema ]), update: z.union([ StoredFileUpdateInputObjectSchema, StoredFileUncheckedUpdateInputObjectSchema ]) }).strict();