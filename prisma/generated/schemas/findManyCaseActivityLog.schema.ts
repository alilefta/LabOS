import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogIncludeObjectSchema as CaseActivityLogIncludeObjectSchema } from './objects/CaseActivityLogInclude.schema';
import { CaseActivityLogOrderByWithRelationInputObjectSchema as CaseActivityLogOrderByWithRelationInputObjectSchema } from './objects/CaseActivityLogOrderByWithRelationInput.schema';
import { CaseActivityLogWhereInputObjectSchema as CaseActivityLogWhereInputObjectSchema } from './objects/CaseActivityLogWhereInput.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './objects/CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogScalarFieldEnumSchema } from './enums/CaseActivityLogScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseActivityLogFindManySelectSchema: z.ZodType<Prisma.CaseActivityLogSelect> = z.object({
    id: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    actorId: z.boolean().optional(),
    actorName: z.boolean().optional(),
    type: z.boolean().optional(),
    summary: z.boolean().optional(),
    payload: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogSelect>;

export const CaseActivityLogFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    actorId: z.boolean().optional(),
    actorName: z.boolean().optional(),
    type: z.boolean().optional(),
    summary: z.boolean().optional(),
    payload: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const CaseActivityLogFindManySchema: z.ZodType<Prisma.CaseActivityLogFindManyArgs> = z.object({ select: CaseActivityLogFindManySelectSchema.optional(), include: z.lazy(() => CaseActivityLogIncludeObjectSchema.optional()), orderBy: z.union([CaseActivityLogOrderByWithRelationInputObjectSchema, CaseActivityLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseActivityLogWhereInputObjectSchema.optional(), cursor: CaseActivityLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseActivityLogScalarFieldEnumSchema, CaseActivityLogScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogFindManyArgs>;

export const CaseActivityLogFindManyZodSchema = z.object({ select: CaseActivityLogFindManySelectSchema.optional(), include: z.lazy(() => CaseActivityLogIncludeObjectSchema.optional()), orderBy: z.union([CaseActivityLogOrderByWithRelationInputObjectSchema, CaseActivityLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseActivityLogWhereInputObjectSchema.optional(), cursor: CaseActivityLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseActivityLogScalarFieldEnumSchema, CaseActivityLogScalarFieldEnumSchema.array()]).optional() }).strict();