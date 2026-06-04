import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonIncludeObjectSchema as CaseWorkItemAddonIncludeObjectSchema } from './objects/CaseWorkItemAddonInclude.schema';
import { CaseWorkItemAddonOrderByWithRelationInputObjectSchema as CaseWorkItemAddonOrderByWithRelationInputObjectSchema } from './objects/CaseWorkItemAddonOrderByWithRelationInput.schema';
import { CaseWorkItemAddonWhereInputObjectSchema as CaseWorkItemAddonWhereInputObjectSchema } from './objects/CaseWorkItemAddonWhereInput.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './objects/CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonScalarFieldEnumSchema } from './enums/CaseWorkItemAddonScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseWorkItemAddonFindManySelectSchema: z.ZodType<Prisma.CaseWorkItemAddonSelect> = z.object({
    id: z.boolean().optional(),
    caseWorkItemId: z.boolean().optional(),
    caseWorkItem: z.boolean().optional(),
    addonId: z.boolean().optional(),
    addon: z.boolean().optional(),
    priceSnapshot: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonSelect>;

export const CaseWorkItemAddonFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    caseWorkItemId: z.boolean().optional(),
    caseWorkItem: z.boolean().optional(),
    addonId: z.boolean().optional(),
    addon: z.boolean().optional(),
    priceSnapshot: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const CaseWorkItemAddonFindManySchema: z.ZodType<Prisma.CaseWorkItemAddonFindManyArgs> = z.object({ select: CaseWorkItemAddonFindManySelectSchema.optional(), include: z.lazy(() => CaseWorkItemAddonIncludeObjectSchema.optional()), orderBy: z.union([CaseWorkItemAddonOrderByWithRelationInputObjectSchema, CaseWorkItemAddonOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWorkItemAddonWhereInputObjectSchema.optional(), cursor: CaseWorkItemAddonWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseWorkItemAddonScalarFieldEnumSchema, CaseWorkItemAddonScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonFindManyArgs>;

export const CaseWorkItemAddonFindManyZodSchema = z.object({ select: CaseWorkItemAddonFindManySelectSchema.optional(), include: z.lazy(() => CaseWorkItemAddonIncludeObjectSchema.optional()), orderBy: z.union([CaseWorkItemAddonOrderByWithRelationInputObjectSchema, CaseWorkItemAddonOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWorkItemAddonWhereInputObjectSchema.optional(), cursor: CaseWorkItemAddonWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseWorkItemAddonScalarFieldEnumSchema, CaseWorkItemAddonScalarFieldEnumSchema.array()]).optional() }).strict();