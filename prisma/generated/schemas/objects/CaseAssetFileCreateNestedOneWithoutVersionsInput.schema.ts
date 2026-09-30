import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateWithoutVersionsInputObjectSchema as CaseAssetFileCreateWithoutVersionsInputObjectSchema } from './CaseAssetFileCreateWithoutVersionsInput.schema';
import { CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema as CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutVersionsInput.schema';
import { CaseAssetFileCreateOrConnectWithoutVersionsInputObjectSchema as CaseAssetFileCreateOrConnectWithoutVersionsInputObjectSchema } from './CaseAssetFileCreateOrConnectWithoutVersionsInput.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutVersionsInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseAssetFileCreateOrConnectWithoutVersionsInputObjectSchema).optional(),
  connect: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseAssetFileCreateNestedOneWithoutVersionsInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateNestedOneWithoutVersionsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateNestedOneWithoutVersionsInput>;
export const CaseAssetFileCreateNestedOneWithoutVersionsInputObjectZodSchema = makeSchema();
