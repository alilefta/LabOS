import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonSelectObjectSchema as CaseWorkItemAddonSelectObjectSchema } from './objects/CaseWorkItemAddonSelect.schema';
import { CaseWorkItemAddonIncludeObjectSchema as CaseWorkItemAddonIncludeObjectSchema } from './objects/CaseWorkItemAddonInclude.schema';
import { CaseWorkItemAddonCreateInputObjectSchema as CaseWorkItemAddonCreateInputObjectSchema } from './objects/CaseWorkItemAddonCreateInput.schema';
import { CaseWorkItemAddonUncheckedCreateInputObjectSchema as CaseWorkItemAddonUncheckedCreateInputObjectSchema } from './objects/CaseWorkItemAddonUncheckedCreateInput.schema';

export const CaseWorkItemAddonCreateOneSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateArgs> = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), include: CaseWorkItemAddonIncludeObjectSchema.optional(), data: z.union([CaseWorkItemAddonCreateInputObjectSchema, CaseWorkItemAddonUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateArgs>;

export const CaseWorkItemAddonCreateOneZodSchema = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), include: CaseWorkItemAddonIncludeObjectSchema.optional(), data: z.union([CaseWorkItemAddonCreateInputObjectSchema, CaseWorkItemAddonUncheckedCreateInputObjectSchema]) }).strict();