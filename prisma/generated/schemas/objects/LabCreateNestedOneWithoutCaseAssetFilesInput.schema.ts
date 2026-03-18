import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCaseAssetFilesInputObjectSchema as LabCreateWithoutCaseAssetFilesInputObjectSchema } from './LabCreateWithoutCaseAssetFilesInput.schema';
import { LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema as LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema } from './LabUncheckedCreateWithoutCaseAssetFilesInput.schema';
import { LabCreateOrConnectWithoutCaseAssetFilesInputObjectSchema as LabCreateOrConnectWithoutCaseAssetFilesInputObjectSchema } from './LabCreateOrConnectWithoutCaseAssetFilesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseAssetFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCaseAssetFilesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutCaseAssetFilesInput>;
export const LabCreateNestedOneWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
