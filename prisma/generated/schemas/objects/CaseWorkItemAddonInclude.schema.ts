import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemArgsObjectSchema as CaseWorkItemArgsObjectSchema } from './CaseWorkItemArgs.schema';
import { ProductAddonArgsObjectSchema as ProductAddonArgsObjectSchema } from './ProductAddonArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  caseWorkItem: z.union([z.boolean(), z.lazy(() => CaseWorkItemArgsObjectSchema)]).optional(),
  addon: z.union([z.boolean(), z.lazy(() => ProductAddonArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional()
}).strict();
export const CaseWorkItemAddonIncludeObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonInclude>;
export const CaseWorkItemAddonIncludeObjectZodSchema = makeSchema();
