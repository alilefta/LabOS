import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateWithoutCaseVersionInputObjectSchema as StoredFileCreateWithoutCaseVersionInputObjectSchema } from './StoredFileCreateWithoutCaseVersionInput.schema';
import { StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema as StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema } from './StoredFileUncheckedCreateWithoutCaseVersionInput.schema';
import { StoredFileCreateOrConnectWithoutCaseVersionInputObjectSchema as StoredFileCreateOrConnectWithoutCaseVersionInputObjectSchema } from './StoredFileCreateOrConnectWithoutCaseVersionInput.schema';
import { StoredFileUpsertWithoutCaseVersionInputObjectSchema as StoredFileUpsertWithoutCaseVersionInputObjectSchema } from './StoredFileUpsertWithoutCaseVersionInput.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateToOneWithWhereWithoutCaseVersionInputObjectSchema as StoredFileUpdateToOneWithWhereWithoutCaseVersionInputObjectSchema } from './StoredFileUpdateToOneWithWhereWithoutCaseVersionInput.schema';
import { StoredFileUpdateWithoutCaseVersionInputObjectSchema as StoredFileUpdateWithoutCaseVersionInputObjectSchema } from './StoredFileUpdateWithoutCaseVersionInput.schema';
import { StoredFileUncheckedUpdateWithoutCaseVersionInputObjectSchema as StoredFileUncheckedUpdateWithoutCaseVersionInputObjectSchema } from './StoredFileUncheckedUpdateWithoutCaseVersionInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoredFileCreateWithoutCaseVersionInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StoredFileCreateOrConnectWithoutCaseVersionInputObjectSchema).optional(),
  upsert: z.lazy(() => StoredFileUpsertWithoutCaseVersionInputObjectSchema).optional(),
  connect: z.lazy(() => StoredFileWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StoredFileUpdateToOneWithWhereWithoutCaseVersionInputObjectSchema), z.lazy(() => StoredFileUpdateWithoutCaseVersionInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutCaseVersionInputObjectSchema)]).optional()
}).strict();
export const StoredFileUpdateOneRequiredWithoutCaseVersionNestedInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateOneRequiredWithoutCaseVersionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateOneRequiredWithoutCaseVersionNestedInput>;
export const StoredFileUpdateOneRequiredWithoutCaseVersionNestedInputObjectZodSchema = makeSchema();
