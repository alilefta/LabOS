import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileCreateWithoutVersionsInputObjectSchema as CaseAssetFileCreateWithoutVersionsInputObjectSchema } from './CaseAssetFileCreateWithoutVersionsInput.schema';
import { CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema as CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutVersionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutVersionsInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema)])
}).strict();
export const CaseAssetFileCreateOrConnectWithoutVersionsInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateOrConnectWithoutVersionsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateOrConnectWithoutVersionsInput>;
export const CaseAssetFileCreateOrConnectWithoutVersionsInputObjectZodSchema = makeSchema();
