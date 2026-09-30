import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema';
import { StoredFileUpdateWithoutCaseVersionInputObjectSchema as StoredFileUpdateWithoutCaseVersionInputObjectSchema } from './StoredFileUpdateWithoutCaseVersionInput.schema';
import { StoredFileUncheckedUpdateWithoutCaseVersionInputObjectSchema as StoredFileUncheckedUpdateWithoutCaseVersionInputObjectSchema } from './StoredFileUncheckedUpdateWithoutCaseVersionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StoredFileUpdateWithoutCaseVersionInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutCaseVersionInputObjectSchema)])
}).strict();
export const StoredFileUpdateToOneWithWhereWithoutCaseVersionInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateToOneWithWhereWithoutCaseVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateToOneWithWhereWithoutCaseVersionInput>;
export const StoredFileUpdateToOneWithWhereWithoutCaseVersionInputObjectZodSchema = makeSchema();
