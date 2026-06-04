import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonSelectObjectSchema as CaseWorkItemAddonSelectObjectSchema } from './objects/CaseWorkItemAddonSelect.schema';
import { CaseWorkItemAddonIncludeObjectSchema as CaseWorkItemAddonIncludeObjectSchema } from './objects/CaseWorkItemAddonInclude.schema';
import { CaseWorkItemAddonUpdateInputObjectSchema as CaseWorkItemAddonUpdateInputObjectSchema } from './objects/CaseWorkItemAddonUpdateInput.schema';
import { CaseWorkItemAddonUncheckedUpdateInputObjectSchema as CaseWorkItemAddonUncheckedUpdateInputObjectSchema } from './objects/CaseWorkItemAddonUncheckedUpdateInput.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './objects/CaseWorkItemAddonWhereUniqueInput.schema';

export const CaseWorkItemAddonUpdateOneSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateArgs> = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), include: CaseWorkItemAddonIncludeObjectSchema.optional(), data: z.union([CaseWorkItemAddonUpdateInputObjectSchema, CaseWorkItemAddonUncheckedUpdateInputObjectSchema]), where: CaseWorkItemAddonWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateArgs>;

export const CaseWorkItemAddonUpdateOneZodSchema = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), include: CaseWorkItemAddonIncludeObjectSchema.optional(), data: z.union([CaseWorkItemAddonUpdateInputObjectSchema, CaseWorkItemAddonUncheckedUpdateInputObjectSchema]), where: CaseWorkItemAddonWhereUniqueInputObjectSchema }).strict();