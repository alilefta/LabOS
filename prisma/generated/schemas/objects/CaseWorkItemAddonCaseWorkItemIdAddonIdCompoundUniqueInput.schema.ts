import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  caseWorkItemId: z.string(),
  addonId: z.string()
}).strict();
export const CaseWorkItemAddonCaseWorkItemIdAddonIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCaseWorkItemIdAddonIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCaseWorkItemIdAddonIdCompoundUniqueInput>;
export const CaseWorkItemAddonCaseWorkItemIdAddonIdCompoundUniqueInputObjectZodSchema = makeSchema();
