import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileSelectObjectSchema as StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileIncludeObjectSchema as StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileCreateInputObjectSchema as StoredFileCreateInputObjectSchema } from './objects/StoredFileCreateInput.schema';
import { StoredFileUncheckedCreateInputObjectSchema as StoredFileUncheckedCreateInputObjectSchema } from './objects/StoredFileUncheckedCreateInput.schema';

export const StoredFileCreateOneSchema: z.ZodType<Prisma.StoredFileCreateArgs> = z.object({ select: StoredFileSelectObjectSchema.optional(), include: StoredFileIncludeObjectSchema.optional(), data: z.union([StoredFileCreateInputObjectSchema, StoredFileUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.StoredFileCreateArgs>;

export const StoredFileCreateOneZodSchema = z.object({ select: StoredFileSelectObjectSchema.optional(), include: StoredFileIncludeObjectSchema.optional(), data: z.union([StoredFileCreateInputObjectSchema, StoredFileUncheckedCreateInputObjectSchema]) }).strict();