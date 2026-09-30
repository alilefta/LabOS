import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileUpdateWithoutCaseVersionInputObjectSchema as StoredFileUpdateWithoutCaseVersionInputObjectSchema } from './StoredFileUpdateWithoutCaseVersionInput.schema';
import { StoredFileUncheckedUpdateWithoutCaseVersionInputObjectSchema as StoredFileUncheckedUpdateWithoutCaseVersionInputObjectSchema } from './StoredFileUncheckedUpdateWithoutCaseVersionInput.schema';
import { StoredFileCreateWithoutCaseVersionInputObjectSchema as StoredFileCreateWithoutCaseVersionInputObjectSchema } from './StoredFileCreateWithoutCaseVersionInput.schema';
import { StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema as StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema } from './StoredFileUncheckedCreateWithoutCaseVersionInput.schema';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StoredFileUpdateWithoutCaseVersionInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutCaseVersionInputObjectSchema)]),
  create: z.union([z.lazy(() => StoredFileCreateWithoutCaseVersionInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema)]),
  where: z.lazy(() => StoredFileWhereInputObjectSchema).optional()
}).strict();
export const StoredFileUpsertWithoutCaseVersionInputObjectSchema: z.ZodType<Prisma.StoredFileUpsertWithoutCaseVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpsertWithoutCaseVersionInput>;
export const StoredFileUpsertWithoutCaseVersionInputObjectZodSchema = makeSchema();
