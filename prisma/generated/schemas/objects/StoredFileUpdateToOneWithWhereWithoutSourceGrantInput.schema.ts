import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema';
import { StoredFileUpdateWithoutSourceGrantInputObjectSchema as StoredFileUpdateWithoutSourceGrantInputObjectSchema } from './StoredFileUpdateWithoutSourceGrantInput.schema';
import { StoredFileUncheckedUpdateWithoutSourceGrantInputObjectSchema as StoredFileUncheckedUpdateWithoutSourceGrantInputObjectSchema } from './StoredFileUncheckedUpdateWithoutSourceGrantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StoredFileUpdateWithoutSourceGrantInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutSourceGrantInputObjectSchema)])
}).strict();
export const StoredFileUpdateToOneWithWhereWithoutSourceGrantInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateToOneWithWhereWithoutSourceGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateToOneWithWhereWithoutSourceGrantInput>;
export const StoredFileUpdateToOneWithWhereWithoutSourceGrantInputObjectZodSchema = makeSchema();
