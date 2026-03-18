import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateWithoutCaseInputObjectSchema as CaseAssetFileUpdateWithoutCaseInputObjectSchema } from './CaseAssetFileUpdateWithoutCaseInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutCaseInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutCaseInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseAssetFileUpdateWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseAssetFileUpdateWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateWithWhereUniqueWithoutCaseInput>;
export const CaseAssetFileUpdateWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();
