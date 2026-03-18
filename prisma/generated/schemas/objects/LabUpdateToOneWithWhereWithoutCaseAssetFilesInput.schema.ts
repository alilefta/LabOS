import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutCaseAssetFilesInputObjectSchema as LabUpdateWithoutCaseAssetFilesInputObjectSchema } from './LabUpdateWithoutCaseAssetFilesInput.schema';
import { LabUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema as LabUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema } from './LabUncheckedUpdateWithoutCaseAssetFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCaseAssetFilesInput>;
export const LabUpdateToOneWithWhereWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
