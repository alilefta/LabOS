import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUpdateWithoutCaseAssetFilesInputObjectSchema as CaseUpdateWithoutCaseAssetFilesInputObjectSchema } from './CaseUpdateWithoutCaseAssetFilesInput.schema';
import { CaseUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema as CaseUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseAssetFilesInput.schema';
import { CaseCreateWithoutCaseAssetFilesInputObjectSchema as CaseCreateWithoutCaseAssetFilesInputObjectSchema } from './CaseCreateWithoutCaseAssetFilesInput.schema';
import { CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema as CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema } from './CaseUncheckedCreateWithoutCaseAssetFilesInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseUpdateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema)]),
  where: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseUpsertWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithoutCaseAssetFilesInput>;
export const CaseUpsertWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
