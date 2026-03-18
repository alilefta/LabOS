import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutCaseAssetFilesInputObjectSchema as CaseCreateWithoutCaseAssetFilesInputObjectSchema } from './CaseCreateWithoutCaseAssetFilesInput.schema';
import { CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema as CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema } from './CaseUncheckedCreateWithoutCaseAssetFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutCaseAssetFilesInput>;
export const CaseCreateOrConnectWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
