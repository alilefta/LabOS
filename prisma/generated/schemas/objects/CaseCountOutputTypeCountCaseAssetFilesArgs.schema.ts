import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './CaseAssetFileWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional()
}).strict();
export const CaseCountOutputTypeCountCaseAssetFilesArgsObjectSchema = makeSchema();
export const CaseCountOutputTypeCountCaseAssetFilesArgsObjectZodSchema = makeSchema();
