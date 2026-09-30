import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileUpdateWithoutSourceGrantInputObjectSchema as StoredFileUpdateWithoutSourceGrantInputObjectSchema } from './StoredFileUpdateWithoutSourceGrantInput.schema';
import { StoredFileUncheckedUpdateWithoutSourceGrantInputObjectSchema as StoredFileUncheckedUpdateWithoutSourceGrantInputObjectSchema } from './StoredFileUncheckedUpdateWithoutSourceGrantInput.schema';
import { StoredFileCreateWithoutSourceGrantInputObjectSchema as StoredFileCreateWithoutSourceGrantInputObjectSchema } from './StoredFileCreateWithoutSourceGrantInput.schema';
import { StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema as StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema } from './StoredFileUncheckedCreateWithoutSourceGrantInput.schema';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StoredFileUpdateWithoutSourceGrantInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutSourceGrantInputObjectSchema)]),
  create: z.union([z.lazy(() => StoredFileCreateWithoutSourceGrantInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema)]),
  where: z.lazy(() => StoredFileWhereInputObjectSchema).optional()
}).strict();
export const StoredFileUpsertWithoutSourceGrantInputObjectSchema: z.ZodType<Prisma.StoredFileUpsertWithoutSourceGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpsertWithoutSourceGrantInput>;
export const StoredFileUpsertWithoutSourceGrantInputObjectZodSchema = makeSchema();
