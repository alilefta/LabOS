import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCountOutputTypeCountUsersArgsObjectSchema as LabCountOutputTypeCountUsersArgsObjectSchema } from './LabCountOutputTypeCountUsersArgs.schema';
import { LabCountOutputTypeCountClinicsArgsObjectSchema as LabCountOutputTypeCountClinicsArgsObjectSchema } from './LabCountOutputTypeCountClinicsArgs.schema';
import { LabCountOutputTypeCountCasesArgsObjectSchema as LabCountOutputTypeCountCasesArgsObjectSchema } from './LabCountOutputTypeCountCasesArgs.schema';
import { LabCountOutputTypeCountCaseCategoriesArgsObjectSchema as LabCountOutputTypeCountCaseCategoriesArgsObjectSchema } from './LabCountOutputTypeCountCaseCategoriesArgs.schema';
import { LabCountOutputTypeCountWorkTypesArgsObjectSchema as LabCountOutputTypeCountWorkTypesArgsObjectSchema } from './LabCountOutputTypeCountWorkTypesArgs.schema';
import { LabCountOutputTypeCountProductsArgsObjectSchema as LabCountOutputTypeCountProductsArgsObjectSchema } from './LabCountOutputTypeCountProductsArgs.schema';
import { LabCountOutputTypeCountCaseWorkItemsArgsObjectSchema as LabCountOutputTypeCountCaseWorkItemsArgsObjectSchema } from './LabCountOutputTypeCountCaseWorkItemsArgs.schema';
import { LabCountOutputTypeCountSelectedTeethArgsObjectSchema as LabCountOutputTypeCountSelectedTeethArgsObjectSchema } from './LabCountOutputTypeCountSelectedTeethArgs.schema';
import { LabCountOutputTypeCountCasePricingPlansArgsObjectSchema as LabCountOutputTypeCountCasePricingPlansArgsObjectSchema } from './LabCountOutputTypeCountCasePricingPlansArgs.schema';
import { LabCountOutputTypeCountCaseAssetFilesArgsObjectSchema as LabCountOutputTypeCountCaseAssetFilesArgsObjectSchema } from './LabCountOutputTypeCountCaseAssetFilesArgs.schema';
import { LabCountOutputTypeCountPatientsArgsObjectSchema as LabCountOutputTypeCountPatientsArgsObjectSchema } from './LabCountOutputTypeCountPatientsArgs.schema';
import { LabCountOutputTypeCountDentistsArgsObjectSchema as LabCountOutputTypeCountDentistsArgsObjectSchema } from './LabCountOutputTypeCountDentistsArgs.schema';
import { LabCountOutputTypeCountStaffAssignmentsArgsObjectSchema as LabCountOutputTypeCountStaffAssignmentsArgsObjectSchema } from './LabCountOutputTypeCountStaffAssignmentsArgs.schema';
import { LabCountOutputTypeCountLabStaffArgsObjectSchema as LabCountOutputTypeCountLabStaffArgsObjectSchema } from './LabCountOutputTypeCountLabStaffArgs.schema';
import { LabCountOutputTypeCountCaseActivityLogsArgsObjectSchema as LabCountOutputTypeCountCaseActivityLogsArgsObjectSchema } from './LabCountOutputTypeCountCaseActivityLogsArgs.schema'

const makeSchema = () => z.object({
  users: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountUsersArgsObjectSchema)]).optional(),
  clinics: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountClinicsArgsObjectSchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCasesArgsObjectSchema)]).optional(),
  caseCategories: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCaseCategoriesArgsObjectSchema)]).optional(),
  workTypes: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountWorkTypesArgsObjectSchema)]).optional(),
  products: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountProductsArgsObjectSchema)]).optional(),
  caseWorkItems: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCaseWorkItemsArgsObjectSchema)]).optional(),
  selectedTeeth: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountSelectedTeethArgsObjectSchema)]).optional(),
  casePricingPlans: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCasePricingPlansArgsObjectSchema)]).optional(),
  caseAssetFiles: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCaseAssetFilesArgsObjectSchema)]).optional(),
  patients: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountPatientsArgsObjectSchema)]).optional(),
  dentists: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountDentistsArgsObjectSchema)]).optional(),
  staffAssignments: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountStaffAssignmentsArgsObjectSchema)]).optional(),
  LabStaff: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountLabStaffArgsObjectSchema)]).optional(),
  caseActivityLogs: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCaseActivityLogsArgsObjectSchema)]).optional()
}).strict();
export const LabCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.LabCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabCountOutputTypeSelect>;
export const LabCountOutputTypeSelectObjectZodSchema = makeSchema();
