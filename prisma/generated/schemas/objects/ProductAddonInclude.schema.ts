import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseWorkItemAddonFindManySchema as CaseWorkItemAddonFindManySchema } from '../findManyCaseWorkItemAddon.schema';
import { ProductAddonCountOutputTypeArgsObjectSchema as ProductAddonCountOutputTypeArgsObjectSchema } from './ProductAddonCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  caseWorkItemAddons: z.union([z.boolean(), z.lazy(() => CaseWorkItemAddonFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProductAddonCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProductAddonIncludeObjectSchema: z.ZodType<Prisma.ProductAddonInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonInclude>;
export const ProductAddonIncludeObjectZodSchema = makeSchema();
