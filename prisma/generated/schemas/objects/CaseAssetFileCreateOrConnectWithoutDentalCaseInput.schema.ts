import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileCreateWithoutDentalCaseInputObjectSchema as CaseAssetFileCreateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileCreateWithoutDentalCaseInput.schema';
import { CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseAssetFileCreateOrConnectWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateOrConnectWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateOrConnectWithoutDentalCaseInput>;
export const CaseAssetFileCreateOrConnectWithoutDentalCaseInputObjectZodSchema = makeSchema();
