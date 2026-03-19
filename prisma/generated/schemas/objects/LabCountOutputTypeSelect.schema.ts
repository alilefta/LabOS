import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCountOutputTypeCountUsersArgsObjectSchema as LabCountOutputTypeCountUsersArgsObjectSchema } from './LabCountOutputTypeCountUsersArgs.schema';
import { LabCountOutputTypeCountClinicsArgsObjectSchema as LabCountOutputTypeCountClinicsArgsObjectSchema } from './LabCountOutputTypeCountClinicsArgs.schema';
import { LabCountOutputTypeCountCasesArgsObjectSchema as LabCountOutputTypeCountCasesArgsObjectSchema } from './LabCountOutputTypeCountCasesArgs.schema';
import { LabCountOutputTypeCountTechniciansArgsObjectSchema as LabCountOutputTypeCountTechniciansArgsObjectSchema } from './LabCountOutputTypeCountTechniciansArgs.schema';
import { LabCountOutputTypeCountSalesRepsArgsObjectSchema as LabCountOutputTypeCountSalesRepsArgsObjectSchema } from './LabCountOutputTypeCountSalesRepsArgs.schema';
import { LabCountOutputTypeCountCaseCategoriesArgsObjectSchema as LabCountOutputTypeCountCaseCategoriesArgsObjectSchema } from './LabCountOutputTypeCountCaseCategoriesArgs.schema';
import { LabCountOutputTypeCountWorkTypesArgsObjectSchema as LabCountOutputTypeCountWorkTypesArgsObjectSchema } from './LabCountOutputTypeCountWorkTypesArgs.schema';
import { LabCountOutputTypeCountProductsArgsObjectSchema as LabCountOutputTypeCountProductsArgsObjectSchema } from './LabCountOutputTypeCountProductsArgs.schema';
import { LabCountOutputTypeCountCaseWorkItemsArgsObjectSchema as LabCountOutputTypeCountCaseWorkItemsArgsObjectSchema } from './LabCountOutputTypeCountCaseWorkItemsArgs.schema';
import { LabCountOutputTypeCountSelectedTeethArgsObjectSchema as LabCountOutputTypeCountSelectedTeethArgsObjectSchema } from './LabCountOutputTypeCountSelectedTeethArgs.schema';
import { LabCountOutputTypeCountCasePricingPlansArgsObjectSchema as LabCountOutputTypeCountCasePricingPlansArgsObjectSchema } from './LabCountOutputTypeCountCasePricingPlansArgs.schema';
import { LabCountOutputTypeCountCaseAssetFilesArgsObjectSchema as LabCountOutputTypeCountCaseAssetFilesArgsObjectSchema } from './LabCountOutputTypeCountCaseAssetFilesArgs.schema';
import { LabCountOutputTypeCountPatientsArgsObjectSchema as LabCountOutputTypeCountPatientsArgsObjectSchema } from './LabCountOutputTypeCountPatientsArgs.schema'

const makeSchema = () => z.object({
  users: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountUsersArgsObjectSchema)]).optional(),
  clinics: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountClinicsArgsObjectSchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCasesArgsObjectSchema)]).optional(),
  technicians: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountTechniciansArgsObjectSchema)]).optional(),
  salesReps: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountSalesRepsArgsObjectSchema)]).optional(),
  caseCategories: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCaseCategoriesArgsObjectSchema)]).optional(),
  workTypes: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountWorkTypesArgsObjectSchema)]).optional(),
  products: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountProductsArgsObjectSchema)]).optional(),
  caseWorkItems: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCaseWorkItemsArgsObjectSchema)]).optional(),
  selectedTeeth: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountSelectedTeethArgsObjectSchema)]).optional(),
  casePricingPlans: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCasePricingPlansArgsObjectSchema)]).optional(),
  caseAssetFiles: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountCaseAssetFilesArgsObjectSchema)]).optional(),
  patients: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeCountPatientsArgsObjectSchema)]).optional()
}).strict();
export const LabCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.LabCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabCountOutputTypeSelect>;
export const LabCountOutputTypeSelectObjectZodSchema = makeSchema();
