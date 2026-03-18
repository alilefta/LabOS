import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileCreateWithoutCaseInputObjectSchema as CaseAssetFileCreateWithoutCaseInputObjectSchema } from './CaseAssetFileCreateWithoutCaseInput.schema';
import { CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema as CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseAssetFileCreateOrConnectWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateOrConnectWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateOrConnectWithoutCaseInput>;
export const CaseAssetFileCreateOrConnectWithoutCaseInputObjectZodSchema = makeSchema();
