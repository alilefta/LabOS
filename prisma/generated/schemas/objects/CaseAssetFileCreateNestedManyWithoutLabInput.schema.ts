import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateWithoutLabInputObjectSchema as CaseAssetFileCreateWithoutLabInputObjectSchema } from './CaseAssetFileCreateWithoutLabInput.schema';
import { CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema as CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutLabInput.schema';
import { CaseAssetFileCreateOrConnectWithoutLabInputObjectSchema as CaseAssetFileCreateOrConnectWithoutLabInputObjectSchema } from './CaseAssetFileCreateOrConnectWithoutLabInput.schema';
import { CaseAssetFileCreateManyLabInputEnvelopeObjectSchema as CaseAssetFileCreateManyLabInputEnvelopeObjectSchema } from './CaseAssetFileCreateManyLabInputEnvelope.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseAssetFileCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseAssetFileCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseAssetFileCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateNestedManyWithoutLabInput>;
export const CaseAssetFileCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
