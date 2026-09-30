import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './CaseAssetFileWhereInput.schema';
import { CaseAssetFileUpdateWithoutVersionsInputObjectSchema as CaseAssetFileUpdateWithoutVersionsInputObjectSchema } from './CaseAssetFileUpdateWithoutVersionsInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutVersionsInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutVersionsInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutVersionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseAssetFileUpdateWithoutVersionsInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutVersionsInputObjectSchema)])
}).strict();
export const CaseAssetFileUpdateToOneWithWhereWithoutVersionsInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateToOneWithWhereWithoutVersionsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateToOneWithWhereWithoutVersionsInput>;
export const CaseAssetFileUpdateToOneWithWhereWithoutVersionsInputObjectZodSchema = makeSchema();
