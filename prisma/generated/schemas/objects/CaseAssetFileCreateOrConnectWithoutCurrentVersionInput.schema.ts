import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema as CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileCreateWithoutCurrentVersionInput.schema';
import { CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema as CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutCurrentVersionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema)])
}).strict();
export const CaseAssetFileCreateOrConnectWithoutCurrentVersionInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateOrConnectWithoutCurrentVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateOrConnectWithoutCurrentVersionInput>;
export const CaseAssetFileCreateOrConnectWithoutCurrentVersionInputObjectZodSchema = makeSchema();
