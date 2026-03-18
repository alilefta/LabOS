import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateWithoutLabInputObjectSchema as CaseAssetFileUpdateWithoutLabInputObjectSchema } from './CaseAssetFileUpdateWithoutLabInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutLabInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutLabInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseAssetFileUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const CaseAssetFileUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateWithWhereUniqueWithoutLabInput>;
export const CaseAssetFileUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
