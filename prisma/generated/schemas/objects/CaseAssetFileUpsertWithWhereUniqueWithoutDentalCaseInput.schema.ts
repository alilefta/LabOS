import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateWithoutDentalCaseInputObjectSchema as CaseAssetFileUpdateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUpdateWithoutDentalCaseInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutDentalCaseInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutDentalCaseInput.schema';
import { CaseAssetFileCreateWithoutDentalCaseInputObjectSchema as CaseAssetFileCreateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileCreateWithoutDentalCaseInput.schema';
import { CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseAssetFileUpdateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutDentalCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseAssetFileUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpsertWithWhereUniqueWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpsertWithWhereUniqueWithoutDentalCaseInput>;
export const CaseAssetFileUpsertWithWhereUniqueWithoutDentalCaseInputObjectZodSchema = makeSchema();
