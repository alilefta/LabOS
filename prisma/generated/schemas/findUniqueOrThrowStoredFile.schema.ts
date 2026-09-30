import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileSelectObjectSchema as StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileIncludeObjectSchema as StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';

export const StoredFileFindUniqueOrThrowSchema: z.ZodType<Prisma.StoredFileFindUniqueOrThrowArgs> = z.object({ select: StoredFileSelectObjectSchema.optional(), include: StoredFileIncludeObjectSchema.optional(), where: StoredFileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StoredFileFindUniqueOrThrowArgs>;

export const StoredFileFindUniqueOrThrowZodSchema = z.object({ select: StoredFileSelectObjectSchema.optional(), include: StoredFileIncludeObjectSchema.optional(), where: StoredFileWhereUniqueInputObjectSchema }).strict();