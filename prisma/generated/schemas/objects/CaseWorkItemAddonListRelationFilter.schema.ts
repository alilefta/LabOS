import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereInputObjectSchema as CaseWorkItemAddonWhereInputObjectSchema } from './CaseWorkItemAddonWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseWorkItemAddonWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseWorkItemAddonWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseWorkItemAddonWhereInputObjectSchema).optional()
}).strict();
export const CaseWorkItemAddonListRelationFilterObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonListRelationFilter>;
export const CaseWorkItemAddonListRelationFilterObjectZodSchema = makeSchema();
