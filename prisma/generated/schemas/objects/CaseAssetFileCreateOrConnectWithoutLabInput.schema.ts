import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileCreateWithoutLabInputObjectSchema as CaseAssetFileCreateWithoutLabInputObjectSchema } from './CaseAssetFileCreateWithoutLabInput.schema';
import { CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema as CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseAssetFileCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateOrConnectWithoutLabInput>;
export const CaseAssetFileCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
