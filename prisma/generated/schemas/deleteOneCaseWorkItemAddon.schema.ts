import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonSelectObjectSchema as CaseWorkItemAddonSelectObjectSchema } from './objects/CaseWorkItemAddonSelect.schema';
import { CaseWorkItemAddonIncludeObjectSchema as CaseWorkItemAddonIncludeObjectSchema } from './objects/CaseWorkItemAddonInclude.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './objects/CaseWorkItemAddonWhereUniqueInput.schema';

export const CaseWorkItemAddonDeleteOneSchema: z.ZodType<Prisma.CaseWorkItemAddonDeleteArgs> = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), include: CaseWorkItemAddonIncludeObjectSchema.optional(), where: CaseWorkItemAddonWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonDeleteArgs>;

export const CaseWorkItemAddonDeleteOneZodSchema = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), include: CaseWorkItemAddonIncludeObjectSchema.optional(), where: CaseWorkItemAddonWhereUniqueInputObjectSchema }).strict();