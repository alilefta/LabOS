import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUpdateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionCreateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema)]),
  where: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionUpsertWithoutCurrentForAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpsertWithoutCurrentForAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpsertWithoutCurrentForAssetInput>;
export const CaseAssetFileVersionUpsertWithoutCurrentForAssetInputObjectZodSchema = makeSchema();
