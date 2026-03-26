import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateWithoutDentalCaseInputObjectSchema as CaseAssetFileUpdateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUpdateWithoutDentalCaseInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutDentalCaseInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseAssetFileUpdateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseAssetFileUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateWithWhereUniqueWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateWithWhereUniqueWithoutDentalCaseInput>;
export const CaseAssetFileUpdateWithWhereUniqueWithoutDentalCaseInputObjectZodSchema = makeSchema();
