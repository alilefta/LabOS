import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseFileAccessAuditOrderByWithRelationInputObjectSchema as CaseFileAccessAuditOrderByWithRelationInputObjectSchema } from './objects/CaseFileAccessAuditOrderByWithRelationInput.schema';
import { CaseFileAccessAuditWhereInputObjectSchema as CaseFileAccessAuditWhereInputObjectSchema } from './objects/CaseFileAccessAuditWhereInput.schema';
import { CaseFileAccessAuditWhereUniqueInputObjectSchema as CaseFileAccessAuditWhereUniqueInputObjectSchema } from './objects/CaseFileAccessAuditWhereUniqueInput.schema';
import { CaseFileAccessAuditScalarFieldEnumSchema } from './enums/CaseFileAccessAuditScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseFileAccessAuditFindFirstSelectSchema: z.ZodType<Prisma.CaseFileAccessAuditSelect> = z.object({
    id: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    labId: z.boolean().optional(),
    actorMemberId: z.boolean().optional(),
    caseId: z.boolean().optional(),
    caseAssetFileId: z.boolean().optional(),
    authorizationOutcome: z.boolean().optional(),
    issuanceOutcome: z.boolean().optional(),
    reason: z.boolean().optional(),
    correlationId: z.boolean().optional(),
    issuedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditSelect>;

export const CaseFileAccessAuditFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    labId: z.boolean().optional(),
    actorMemberId: z.boolean().optional(),
    caseId: z.boolean().optional(),
    caseAssetFileId: z.boolean().optional(),
    authorizationOutcome: z.boolean().optional(),
    issuanceOutcome: z.boolean().optional(),
    reason: z.boolean().optional(),
    correlationId: z.boolean().optional(),
    issuedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const CaseFileAccessAuditFindFirstSchema: z.ZodType<Prisma.CaseFileAccessAuditFindFirstArgs> = z.object({ select: CaseFileAccessAuditFindFirstSelectSchema.optional(),  orderBy: z.union([CaseFileAccessAuditOrderByWithRelationInputObjectSchema, CaseFileAccessAuditOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseFileAccessAuditWhereInputObjectSchema.optional(), cursor: CaseFileAccessAuditWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseFileAccessAuditScalarFieldEnumSchema, CaseFileAccessAuditScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditFindFirstArgs>;

export const CaseFileAccessAuditFindFirstZodSchema = z.object({ select: CaseFileAccessAuditFindFirstSelectSchema.optional(),  orderBy: z.union([CaseFileAccessAuditOrderByWithRelationInputObjectSchema, CaseFileAccessAuditOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseFileAccessAuditWhereInputObjectSchema.optional(), cursor: CaseFileAccessAuditWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseFileAccessAuditScalarFieldEnumSchema, CaseFileAccessAuditScalarFieldEnumSchema.array()]).optional() }).strict();