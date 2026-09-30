import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileUpdateWithoutCurrentVersionInputObjectSchema as CaseAssetFileUpdateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUpdateWithoutCurrentVersionInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutCurrentVersionInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutCurrentVersionInput.schema';
import { CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema as CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileCreateWithoutCurrentVersionInput.schema';
import { CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema as CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutCurrentVersionInput.schema';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './CaseAssetFileWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseAssetFileUpdateWithoutCurrentVersionInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutCurrentVersionInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema)]),
  where: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional()
}).strict();
export const CaseAssetFileUpsertWithoutCurrentVersionInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpsertWithoutCurrentVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpsertWithoutCurrentVersionInput>;
export const CaseAssetFileUpsertWithoutCurrentVersionInputObjectZodSchema = makeSchema();
