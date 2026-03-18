import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutCaseAssetFilesInputObjectSchema as LabCreateWithoutCaseAssetFilesInputObjectSchema } from './LabCreateWithoutCaseAssetFilesInput.schema';
import { LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema as LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema } from './LabUncheckedCreateWithoutCaseAssetFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutCaseAssetFilesInput>;
export const LabCreateOrConnectWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
