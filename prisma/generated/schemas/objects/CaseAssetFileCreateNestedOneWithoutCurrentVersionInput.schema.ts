import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema as CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileCreateWithoutCurrentVersionInput.schema';
import { CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema as CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutCurrentVersionInput.schema';
import { CaseAssetFileCreateOrConnectWithoutCurrentVersionInputObjectSchema as CaseAssetFileCreateOrConnectWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileCreateOrConnectWithoutCurrentVersionInput.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseAssetFileCreateOrConnectWithoutCurrentVersionInputObjectSchema).optional(),
  connect: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateNestedOneWithoutCurrentVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateNestedOneWithoutCurrentVersionInput>;
export const CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectZodSchema = makeSchema();
