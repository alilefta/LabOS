import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateWithoutDentalCaseInputObjectSchema as CaseAssetFileCreateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileCreateWithoutDentalCaseInput.schema';
import { CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutDentalCaseInput.schema';
import { CaseAssetFileCreateOrConnectWithoutDentalCaseInputObjectSchema as CaseAssetFileCreateOrConnectWithoutDentalCaseInputObjectSchema } from './CaseAssetFileCreateOrConnectWithoutDentalCaseInput.schema';
import { CaseAssetFileCreateManyDentalCaseInputEnvelopeObjectSchema as CaseAssetFileCreateManyDentalCaseInputEnvelopeObjectSchema } from './CaseAssetFileCreateManyDentalCaseInputEnvelope.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileCreateWithoutDentalCaseInputObjectSchema).array(), z.lazy(() => CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseAssetFileCreateOrConnectWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileCreateOrConnectWithoutDentalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseAssetFileCreateManyDentalCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInput>;
export const CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectZodSchema = makeSchema();
