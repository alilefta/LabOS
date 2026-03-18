import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateWithoutCaseInputObjectSchema as CaseAssetFileCreateWithoutCaseInputObjectSchema } from './CaseAssetFileCreateWithoutCaseInput.schema';
import { CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema as CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutCaseInput.schema';
import { CaseAssetFileCreateOrConnectWithoutCaseInputObjectSchema as CaseAssetFileCreateOrConnectWithoutCaseInputObjectSchema } from './CaseAssetFileCreateOrConnectWithoutCaseInput.schema';
import { CaseAssetFileCreateManyCaseInputEnvelopeObjectSchema as CaseAssetFileCreateManyCaseInputEnvelopeObjectSchema } from './CaseAssetFileCreateManyCaseInputEnvelope.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseAssetFileCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseAssetFileCreateManyCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseAssetFileCreateNestedManyWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateNestedManyWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateNestedManyWithoutCaseInput>;
export const CaseAssetFileCreateNestedManyWithoutCaseInputObjectZodSchema = makeSchema();
