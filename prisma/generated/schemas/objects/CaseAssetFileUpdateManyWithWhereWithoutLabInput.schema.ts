import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileScalarWhereInputObjectSchema as CaseAssetFileScalarWhereInputObjectSchema } from './CaseAssetFileScalarWhereInput.schema';
import { CaseAssetFileUpdateManyMutationInputObjectSchema as CaseAssetFileUpdateManyMutationInputObjectSchema } from './CaseAssetFileUpdateManyMutationInput.schema';
import { CaseAssetFileUncheckedUpdateManyWithoutLabInputObjectSchema as CaseAssetFileUncheckedUpdateManyWithoutLabInputObjectSchema } from './CaseAssetFileUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseAssetFileUpdateManyMutationInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const CaseAssetFileUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateManyWithWhereWithoutLabInput>;
export const CaseAssetFileUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
