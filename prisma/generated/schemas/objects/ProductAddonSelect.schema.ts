import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseWorkItemAddonFindManySchema as CaseWorkItemAddonFindManySchema } from '../findManyCaseWorkItemAddon.schema';
import { ProductAddonCountOutputTypeArgsObjectSchema as ProductAddonCountOutputTypeArgsObjectSchema } from './ProductAddonCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  productId: z.boolean().optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  price: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  caseWorkItemAddons: z.union([z.boolean(), z.lazy(() => CaseWorkItemAddonFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProductAddonCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProductAddonSelectObjectSchema: z.ZodType<Prisma.ProductAddonSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonSelect>;
export const ProductAddonSelectObjectZodSchema = makeSchema();
