import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileUpdateWithoutVersionsInputObjectSchema as CaseAssetFileUpdateWithoutVersionsInputObjectSchema } from './CaseAssetFileUpdateWithoutVersionsInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutVersionsInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutVersionsInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutVersionsInput.schema';
import { CaseAssetFileCreateWithoutVersionsInputObjectSchema as CaseAssetFileCreateWithoutVersionsInputObjectSchema } from './CaseAssetFileCreateWithoutVersionsInput.schema';
import { CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema as CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutVersionsInput.schema';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './CaseAssetFileWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseAssetFileUpdateWithoutVersionsInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutVersionsInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutVersionsInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema)]),
  where: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional()
}).strict();
export const CaseAssetFileUpsertWithoutVersionsInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpsertWithoutVersionsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpsertWithoutVersionsInput>;
export const CaseAssetFileUpsertWithoutVersionsInputObjectZodSchema = makeSchema();
