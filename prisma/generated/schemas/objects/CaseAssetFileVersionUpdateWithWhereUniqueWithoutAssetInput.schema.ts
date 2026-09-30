import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionUpdateWithoutAssetInputObjectSchema as CaseAssetFileVersionUpdateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUpdateWithoutAssetInput.schema';
import { CaseAssetFileVersionUncheckedUpdateWithoutAssetInputObjectSchema as CaseAssetFileVersionUncheckedUpdateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateWithoutAssetInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseAssetFileVersionUpdateWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateWithoutAssetInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionUpdateWithWhereUniqueWithoutAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateWithWhereUniqueWithoutAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateWithWhereUniqueWithoutAssetInput>;
export const CaseAssetFileVersionUpdateWithWhereUniqueWithoutAssetInputObjectZodSchema = makeSchema();
