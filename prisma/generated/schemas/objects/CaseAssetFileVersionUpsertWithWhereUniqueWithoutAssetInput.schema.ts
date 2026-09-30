import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionUpdateWithoutAssetInputObjectSchema as CaseAssetFileVersionUpdateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUpdateWithoutAssetInput.schema';
import { CaseAssetFileVersionUncheckedUpdateWithoutAssetInputObjectSchema as CaseAssetFileVersionUncheckedUpdateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateWithoutAssetInput.schema';
import { CaseAssetFileVersionCreateWithoutAssetInputObjectSchema as CaseAssetFileVersionCreateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionCreateWithoutAssetInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutAssetInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseAssetFileVersionUpdateWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateWithoutAssetInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionUpsertWithWhereUniqueWithoutAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpsertWithWhereUniqueWithoutAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpsertWithWhereUniqueWithoutAssetInput>;
export const CaseAssetFileVersionUpsertWithWhereUniqueWithoutAssetInputObjectZodSchema = makeSchema();
