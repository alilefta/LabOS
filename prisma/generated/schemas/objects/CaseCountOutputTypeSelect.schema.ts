import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCountOutputTypeCountCaseItemsArgsObjectSchema as CaseCountOutputTypeCountCaseItemsArgsObjectSchema } from './CaseCountOutputTypeCountCaseItemsArgs.schema';
import { CaseCountOutputTypeCountCaseAssetFilesArgsObjectSchema as CaseCountOutputTypeCountCaseAssetFilesArgsObjectSchema } from './CaseCountOutputTypeCountCaseAssetFilesArgs.schema'

const makeSchema = () => z.object({
  caseItems: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeCountCaseItemsArgsObjectSchema)]).optional(),
  caseAssetFiles: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeCountCaseAssetFilesArgsObjectSchema)]).optional()
}).strict();
export const CaseCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CaseCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseCountOutputTypeSelect>;
export const CaseCountOutputTypeSelectObjectZodSchema = makeSchema();
