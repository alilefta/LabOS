import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemArgsObjectSchema as CaseWorkItemArgsObjectSchema } from './CaseWorkItemArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  toothPosition: z.boolean().optional(),
  caseWorkItemId: z.boolean().optional(),
  caseWorkItem: z.union([z.boolean(), z.lazy(() => CaseWorkItemArgsObjectSchema)]).optional(),
  labId: z.boolean().optional(),
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const SelectedToothSelectObjectSchema: z.ZodType<Prisma.SelectedToothSelect> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothSelect>;
export const SelectedToothSelectObjectZodSchema = makeSchema();
