import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseUpdateWithoutCaseAssetFilesInputObjectSchema as CaseUpdateWithoutCaseAssetFilesInputObjectSchema } from './CaseUpdateWithoutCaseAssetFilesInput.schema';
import { CaseUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema as CaseUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseAssetFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseUpdateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema)])
}).strict();
export const CaseUpdateToOneWithWhereWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutCaseAssetFilesInput>;
export const CaseUpdateToOneWithWhereWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
