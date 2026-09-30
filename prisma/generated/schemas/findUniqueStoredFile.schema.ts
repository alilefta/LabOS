import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileSelectObjectSchema as StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileIncludeObjectSchema as StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';

export const StoredFileFindUniqueSchema: z.ZodType<Prisma.StoredFileFindUniqueArgs> = z.object({ select: StoredFileSelectObjectSchema.optional(), include: StoredFileIncludeObjectSchema.optional(), where: StoredFileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StoredFileFindUniqueArgs>;

export const StoredFileFindUniqueZodSchema = z.object({ select: StoredFileSelectObjectSchema.optional(), include: StoredFileIncludeObjectSchema.optional(), where: StoredFileWhereUniqueInputObjectSchema }).strict();