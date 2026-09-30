import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateWithoutLabInputObjectSchema as StoredFileUpdateWithoutLabInputObjectSchema } from './StoredFileUpdateWithoutLabInput.schema';
import { StoredFileUncheckedUpdateWithoutLabInputObjectSchema as StoredFileUncheckedUpdateWithoutLabInputObjectSchema } from './StoredFileUncheckedUpdateWithoutLabInput.schema';
import { StoredFileCreateWithoutLabInputObjectSchema as StoredFileCreateWithoutLabInputObjectSchema } from './StoredFileCreateWithoutLabInput.schema';
import { StoredFileUncheckedCreateWithoutLabInputObjectSchema as StoredFileUncheckedCreateWithoutLabInputObjectSchema } from './StoredFileUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StoredFileUpdateWithoutLabInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => StoredFileCreateWithoutLabInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const StoredFileUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.StoredFileUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpsertWithWhereUniqueWithoutLabInput>;
export const StoredFileUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
