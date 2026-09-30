import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileCreateWithoutCaseVersionInputObjectSchema as StoredFileCreateWithoutCaseVersionInputObjectSchema } from './StoredFileCreateWithoutCaseVersionInput.schema';
import { StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema as StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema } from './StoredFileUncheckedCreateWithoutCaseVersionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StoredFileCreateWithoutCaseVersionInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema)])
}).strict();
export const StoredFileCreateOrConnectWithoutCaseVersionInputObjectSchema: z.ZodType<Prisma.StoredFileCreateOrConnectWithoutCaseVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateOrConnectWithoutCaseVersionInput>;
export const StoredFileCreateOrConnectWithoutCaseVersionInputObjectZodSchema = makeSchema();
