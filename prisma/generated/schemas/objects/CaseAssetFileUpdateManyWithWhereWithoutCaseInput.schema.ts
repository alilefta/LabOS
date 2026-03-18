import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileScalarWhereInputObjectSchema as CaseAssetFileScalarWhereInputObjectSchema } from './CaseAssetFileScalarWhereInput.schema';
import { CaseAssetFileUpdateManyMutationInputObjectSchema as CaseAssetFileUpdateManyMutationInputObjectSchema } from './CaseAssetFileUpdateManyMutationInput.schema';
import { CaseAssetFileUncheckedUpdateManyWithoutCaseInputObjectSchema as CaseAssetFileUncheckedUpdateManyWithoutCaseInputObjectSchema } from './CaseAssetFileUncheckedUpdateManyWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseAssetFileUpdateManyMutationInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateManyWithoutCaseInputObjectSchema)])
}).strict();
export const CaseAssetFileUpdateManyWithWhereWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateManyWithWhereWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateManyWithWhereWithoutCaseInput>;
export const CaseAssetFileUpdateManyWithWhereWithoutCaseInputObjectZodSchema = makeSchema();
