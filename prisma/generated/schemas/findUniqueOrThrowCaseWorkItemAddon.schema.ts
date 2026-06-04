import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonSelectObjectSchema as CaseWorkItemAddonSelectObjectSchema } from './objects/CaseWorkItemAddonSelect.schema';
import { CaseWorkItemAddonIncludeObjectSchema as CaseWorkItemAddonIncludeObjectSchema } from './objects/CaseWorkItemAddonInclude.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './objects/CaseWorkItemAddonWhereUniqueInput.schema';

export const CaseWorkItemAddonFindUniqueOrThrowSchema: z.ZodType<Prisma.CaseWorkItemAddonFindUniqueOrThrowArgs> = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), include: CaseWorkItemAddonIncludeObjectSchema.optional(), where: CaseWorkItemAddonWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonFindUniqueOrThrowArgs>;

export const CaseWorkItemAddonFindUniqueOrThrowZodSchema = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), include: CaseWorkItemAddonIncludeObjectSchema.optional(), where: CaseWorkItemAddonWhereUniqueInputObjectSchema }).strict();