import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateWithoutLabInputObjectSchema as CaseAssetFileUpdateWithoutLabInputObjectSchema } from './CaseAssetFileUpdateWithoutLabInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutLabInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutLabInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutLabInput.schema';
import { CaseAssetFileCreateWithoutLabInputObjectSchema as CaseAssetFileCreateWithoutLabInputObjectSchema } from './CaseAssetFileCreateWithoutLabInput.schema';
import { CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema as CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseAssetFileUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseAssetFileUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpsertWithWhereUniqueWithoutLabInput>;
export const CaseAssetFileUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
