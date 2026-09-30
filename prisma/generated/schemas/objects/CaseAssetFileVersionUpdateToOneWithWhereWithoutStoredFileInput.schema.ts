import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema';
import { CaseAssetFileVersionUpdateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUpdateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUpdateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseAssetFileVersionUpdateWithoutStoredFileInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionUpdateToOneWithWhereWithoutStoredFileInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateToOneWithWhereWithoutStoredFileInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateToOneWithWhereWithoutStoredFileInput>;
export const CaseAssetFileVersionUpdateToOneWithWhereWithoutStoredFileInputObjectZodSchema = makeSchema();
