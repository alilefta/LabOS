import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateWithoutCaseVersionInputObjectSchema as StoredFileCreateWithoutCaseVersionInputObjectSchema } from './StoredFileCreateWithoutCaseVersionInput.schema';
import { StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema as StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema } from './StoredFileUncheckedCreateWithoutCaseVersionInput.schema';
import { StoredFileCreateOrConnectWithoutCaseVersionInputObjectSchema as StoredFileCreateOrConnectWithoutCaseVersionInputObjectSchema } from './StoredFileCreateOrConnectWithoutCaseVersionInput.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoredFileCreateWithoutCaseVersionInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StoredFileCreateOrConnectWithoutCaseVersionInputObjectSchema).optional(),
  connect: z.lazy(() => StoredFileWhereUniqueInputObjectSchema).optional()
}).strict();
export const StoredFileCreateNestedOneWithoutCaseVersionInputObjectSchema: z.ZodType<Prisma.StoredFileCreateNestedOneWithoutCaseVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateNestedOneWithoutCaseVersionInput>;
export const StoredFileCreateNestedOneWithoutCaseVersionInputObjectZodSchema = makeSchema();
