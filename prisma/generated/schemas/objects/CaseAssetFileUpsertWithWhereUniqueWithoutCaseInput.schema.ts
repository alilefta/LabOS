import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateWithoutCaseInputObjectSchema as CaseAssetFileUpdateWithoutCaseInputObjectSchema } from './CaseAssetFileUpdateWithoutCaseInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutCaseInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutCaseInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutCaseInput.schema';
import { CaseAssetFileCreateWithoutCaseInputObjectSchema as CaseAssetFileCreateWithoutCaseInputObjectSchema } from './CaseAssetFileCreateWithoutCaseInput.schema';
import { CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema as CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseAssetFileUpdateWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseAssetFileUpsertWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpsertWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpsertWithWhereUniqueWithoutCaseInput>;
export const CaseAssetFileUpsertWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();
