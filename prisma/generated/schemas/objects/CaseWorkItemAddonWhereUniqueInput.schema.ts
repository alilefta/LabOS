import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonCaseWorkItemIdAddonIdCompoundUniqueInputObjectSchema as CaseWorkItemAddonCaseWorkItemIdAddonIdCompoundUniqueInputObjectSchema } from './CaseWorkItemAddonCaseWorkItemIdAddonIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  caseWorkItemId_addonId: z.lazy(() => CaseWorkItemAddonCaseWorkItemIdAddonIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const CaseWorkItemAddonWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonWhereUniqueInput>;
export const CaseWorkItemAddonWhereUniqueInputObjectZodSchema = makeSchema();
