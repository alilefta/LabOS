import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutCaseAssetFilesInputObjectSchema as LabUpdateWithoutCaseAssetFilesInputObjectSchema } from './LabUpdateWithoutCaseAssetFilesInput.schema';
import { LabUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema as LabUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema } from './LabUncheckedUpdateWithoutCaseAssetFilesInput.schema';
import { LabCreateWithoutCaseAssetFilesInputObjectSchema as LabCreateWithoutCaseAssetFilesInputObjectSchema } from './LabCreateWithoutCaseAssetFilesInput.schema';
import { LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema as LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema } from './LabUncheckedCreateWithoutCaseAssetFilesInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutCaseAssetFilesInput>;
export const LabUpsertWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
