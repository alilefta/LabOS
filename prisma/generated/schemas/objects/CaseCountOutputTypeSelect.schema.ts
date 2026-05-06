import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCountOutputTypeCountCaseItemsArgsObjectSchema as CaseCountOutputTypeCountCaseItemsArgsObjectSchema } from './CaseCountOutputTypeCountCaseItemsArgs.schema';
import { CaseCountOutputTypeCountStaffAssignmentsArgsObjectSchema as CaseCountOutputTypeCountStaffAssignmentsArgsObjectSchema } from './CaseCountOutputTypeCountStaffAssignmentsArgs.schema';
import { CaseCountOutputTypeCountCaseActivityLogsArgsObjectSchema as CaseCountOutputTypeCountCaseActivityLogsArgsObjectSchema } from './CaseCountOutputTypeCountCaseActivityLogsArgs.schema';
import { CaseCountOutputTypeCountCaseAssetFilesArgsObjectSchema as CaseCountOutputTypeCountCaseAssetFilesArgsObjectSchema } from './CaseCountOutputTypeCountCaseAssetFilesArgs.schema';
import { CaseCountOutputTypeCountRemakesArgsObjectSchema as CaseCountOutputTypeCountRemakesArgsObjectSchema } from './CaseCountOutputTypeCountRemakesArgs.schema'

const makeSchema = () => z.object({
  caseItems: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeCountCaseItemsArgsObjectSchema)]).optional(),
  staffAssignments: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeCountStaffAssignmentsArgsObjectSchema)]).optional(),
  caseActivityLogs: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeCountCaseActivityLogsArgsObjectSchema)]).optional(),
  caseAssetFiles: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeCountCaseAssetFilesArgsObjectSchema)]).optional(),
  remakes: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeCountRemakesArgsObjectSchema)]).optional()
}).strict();
export const CaseCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CaseCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseCountOutputTypeSelect>;
export const CaseCountOutputTypeSelectObjectZodSchema = makeSchema();
