import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateWithoutLabInputObjectSchema as StoredFileUpdateWithoutLabInputObjectSchema } from './StoredFileUpdateWithoutLabInput.schema';
import { StoredFileUncheckedUpdateWithoutLabInputObjectSchema as StoredFileUncheckedUpdateWithoutLabInputObjectSchema } from './StoredFileUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StoredFileUpdateWithoutLabInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const StoredFileUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateWithWhereUniqueWithoutLabInput>;
export const StoredFileUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
