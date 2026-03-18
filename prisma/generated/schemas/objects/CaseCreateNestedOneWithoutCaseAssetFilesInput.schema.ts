import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutCaseAssetFilesInputObjectSchema as CaseCreateWithoutCaseAssetFilesInputObjectSchema } from './CaseCreateWithoutCaseAssetFilesInput.schema';
import { CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema as CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema } from './CaseUncheckedCreateWithoutCaseAssetFilesInput.schema';
import { CaseCreateOrConnectWithoutCaseAssetFilesInputObjectSchema as CaseCreateOrConnectWithoutCaseAssetFilesInputObjectSchema } from './CaseCreateOrConnectWithoutCaseAssetFilesInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutCaseAssetFilesInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCreateNestedOneWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedOneWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedOneWithoutCaseAssetFilesInput>;
export const CaseCreateNestedOneWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
