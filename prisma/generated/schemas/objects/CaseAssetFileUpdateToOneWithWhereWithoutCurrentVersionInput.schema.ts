import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './CaseAssetFileWhereInput.schema';
import { CaseAssetFileUpdateWithoutCurrentVersionInputObjectSchema as CaseAssetFileUpdateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUpdateWithoutCurrentVersionInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutCurrentVersionInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutCurrentVersionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseAssetFileUpdateWithoutCurrentVersionInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutCurrentVersionInputObjectSchema)])
}).strict();
export const CaseAssetFileUpdateToOneWithWhereWithoutCurrentVersionInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateToOneWithWhereWithoutCurrentVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateToOneWithWhereWithoutCurrentVersionInput>;
export const CaseAssetFileUpdateToOneWithWhereWithoutCurrentVersionInputObjectZodSchema = makeSchema();
