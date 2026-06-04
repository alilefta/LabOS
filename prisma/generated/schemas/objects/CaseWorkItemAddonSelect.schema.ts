import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemArgsObjectSchema as CaseWorkItemArgsObjectSchema } from './CaseWorkItemArgs.schema';
import { ProductAddonArgsObjectSchema as ProductAddonArgsObjectSchema } from './ProductAddonArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  caseWorkItemId: z.boolean().optional(),
  caseWorkItem: z.union([z.boolean(), z.lazy(() => CaseWorkItemArgsObjectSchema)]).optional(),
  addonId: z.boolean().optional(),
  addon: z.union([z.boolean(), z.lazy(() => ProductAddonArgsObjectSchema)]).optional(),
  priceSnapshot: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  createdAt: z.boolean().optional()
}).strict();
export const CaseWorkItemAddonSelectObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonSelect>;
export const CaseWorkItemAddonSelectObjectZodSchema = makeSchema();
