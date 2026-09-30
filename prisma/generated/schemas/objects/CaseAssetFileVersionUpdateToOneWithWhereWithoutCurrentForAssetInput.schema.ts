import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema';
import { CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUpdateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionUpdateToOneWithWhereWithoutCurrentForAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateToOneWithWhereWithoutCurrentForAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateToOneWithWhereWithoutCurrentForAssetInput>;
export const CaseAssetFileVersionUpdateToOneWithWhereWithoutCurrentForAssetInputObjectZodSchema = makeSchema();
