import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemArgsObjectSchema as CaseWorkItemArgsObjectSchema } from './CaseWorkItemArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  caseWorkItem: z.union([z.boolean(), z.lazy(() => CaseWorkItemArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional()
}).strict();
export const SelectedToothIncludeObjectSchema: z.ZodType<Prisma.SelectedToothInclude> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothInclude>;
export const SelectedToothIncludeObjectZodSchema = makeSchema();
