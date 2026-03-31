import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { ClinicArgsObjectSchema as ClinicArgsObjectSchema } from './ClinicArgs.schema';
import { CaseWorkItemFindManySchema as CaseWorkItemFindManySchema } from '../findManyCaseWorkItem.schema';
import { CasePricingPlanCountOutputTypeArgsObjectSchema as CasePricingPlanCountOutputTypeArgsObjectSchema } from './CasePricingPlanCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  pricingStrategy: z.boolean().optional(),
  firstToothPrice: z.boolean().optional(),
  additionalToothPrice: z.boolean().optional(),
  teethCountToApplyBulkPrice: z.boolean().optional(),
  bulkPrice: z.boolean().optional(),
  toothPrice: z.boolean().optional(),
  productId: z.boolean().optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  clinicId: z.boolean().optional(),
  clinic: z.union([z.boolean(), z.lazy(() => ClinicArgsObjectSchema)]).optional(),
  caseWorkItem: z.union([z.boolean(), z.lazy(() => CaseWorkItemFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => CasePricingPlanCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CasePricingPlanSelectObjectSchema: z.ZodType<Prisma.CasePricingPlanSelect> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanSelect>;
export const CasePricingPlanSelectObjectZodSchema = makeSchema();
