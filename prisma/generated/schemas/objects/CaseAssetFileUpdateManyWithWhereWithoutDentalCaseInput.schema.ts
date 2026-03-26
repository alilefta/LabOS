import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileScalarWhereInputObjectSchema as CaseAssetFileScalarWhereInputObjectSchema } from './CaseAssetFileScalarWhereInput.schema';
import { CaseAssetFileUpdateManyMutationInputObjectSchema as CaseAssetFileUpdateManyMutationInputObjectSchema } from './CaseAssetFileUpdateManyMutationInput.schema';
import { CaseAssetFileUncheckedUpdateManyWithoutDentalCaseInputObjectSchema as CaseAssetFileUncheckedUpdateManyWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUncheckedUpdateManyWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseAssetFileUpdateManyMutationInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateManyWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseAssetFileUpdateManyWithWhereWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateManyWithWhereWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateManyWithWhereWithoutDentalCaseInput>;
export const CaseAssetFileUpdateManyWithWhereWithoutDentalCaseInputObjectZodSchema = makeSchema();
