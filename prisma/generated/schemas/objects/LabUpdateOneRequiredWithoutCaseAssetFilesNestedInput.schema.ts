import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCaseAssetFilesInputObjectSchema as LabCreateWithoutCaseAssetFilesInputObjectSchema } from './LabCreateWithoutCaseAssetFilesInput.schema';
import { LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema as LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema } from './LabUncheckedCreateWithoutCaseAssetFilesInput.schema';
import { LabCreateOrConnectWithoutCaseAssetFilesInputObjectSchema as LabCreateOrConnectWithoutCaseAssetFilesInputObjectSchema } from './LabCreateOrConnectWithoutCaseAssetFilesInput.schema';
import { LabUpsertWithoutCaseAssetFilesInputObjectSchema as LabUpsertWithoutCaseAssetFilesInputObjectSchema } from './LabUpsertWithoutCaseAssetFilesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutCaseAssetFilesInputObjectSchema as LabUpdateToOneWithWhereWithoutCaseAssetFilesInputObjectSchema } from './LabUpdateToOneWithWhereWithoutCaseAssetFilesInput.schema';
import { LabUpdateWithoutCaseAssetFilesInputObjectSchema as LabUpdateWithoutCaseAssetFilesInputObjectSchema } from './LabUpdateWithoutCaseAssetFilesInput.schema';
import { LabUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema as LabUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema } from './LabUncheckedUpdateWithoutCaseAssetFilesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCaseAssetFilesInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutCaseAssetFilesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => LabUpdateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutCaseAssetFilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutCaseAssetFilesNestedInput>;
export const LabUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectZodSchema = makeSchema();
