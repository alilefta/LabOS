import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutCaseAssetFilesInputObjectSchema as CaseCreateWithoutCaseAssetFilesInputObjectSchema } from './CaseCreateWithoutCaseAssetFilesInput.schema';
import { CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema as CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema } from './CaseUncheckedCreateWithoutCaseAssetFilesInput.schema';
import { CaseCreateOrConnectWithoutCaseAssetFilesInputObjectSchema as CaseCreateOrConnectWithoutCaseAssetFilesInputObjectSchema } from './CaseCreateOrConnectWithoutCaseAssetFilesInput.schema';
import { CaseUpsertWithoutCaseAssetFilesInputObjectSchema as CaseUpsertWithoutCaseAssetFilesInputObjectSchema } from './CaseUpsertWithoutCaseAssetFilesInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateToOneWithWhereWithoutCaseAssetFilesInputObjectSchema as CaseUpdateToOneWithWhereWithoutCaseAssetFilesInputObjectSchema } from './CaseUpdateToOneWithWhereWithoutCaseAssetFilesInput.schema';
import { CaseUpdateWithoutCaseAssetFilesInputObjectSchema as CaseUpdateWithoutCaseAssetFilesInputObjectSchema } from './CaseUpdateWithoutCaseAssetFilesInput.schema';
import { CaseUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema as CaseUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseAssetFilesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseAssetFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutCaseAssetFilesInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseUpsertWithoutCaseAssetFilesInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseUpdateToOneWithWhereWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => CaseUpdateWithoutCaseAssetFilesInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseAssetFilesInputObjectSchema)]).optional()
}).strict();
export const CaseUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateOneRequiredWithoutCaseAssetFilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateOneRequiredWithoutCaseAssetFilesNestedInput>;
export const CaseUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectZodSchema = makeSchema();
