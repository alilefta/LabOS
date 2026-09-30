import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionScalarWhereInputObjectSchema as CaseAssetFileVersionScalarWhereInputObjectSchema } from './CaseAssetFileVersionScalarWhereInput.schema';
import { CaseAssetFileVersionUpdateManyMutationInputObjectSchema as CaseAssetFileVersionUpdateManyMutationInputObjectSchema } from './CaseAssetFileVersionUpdateManyMutationInput.schema';
import { CaseAssetFileVersionUncheckedUpdateManyWithoutAssetInputObjectSchema as CaseAssetFileVersionUncheckedUpdateManyWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateManyWithoutAssetInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseAssetFileVersionUpdateManyMutationInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateManyWithoutAssetInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionUpdateManyWithWhereWithoutAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateManyWithWhereWithoutAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateManyWithWhereWithoutAssetInput>;
export const CaseAssetFileVersionUpdateManyWithWhereWithoutAssetInputObjectZodSchema = makeSchema();
