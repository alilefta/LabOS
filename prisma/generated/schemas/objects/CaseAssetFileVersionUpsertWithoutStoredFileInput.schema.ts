import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionUpdateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUpdateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUpdateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionCreateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseAssetFileVersionUpdateWithoutStoredFileInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema)]),
  where: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionUpsertWithoutStoredFileInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpsertWithoutStoredFileInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpsertWithoutStoredFileInput>;
export const CaseAssetFileVersionUpsertWithoutStoredFileInputObjectZodSchema = makeSchema();
