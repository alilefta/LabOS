import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileVersionIncludeObjectSchema as CaseAssetFileVersionIncludeObjectSchema } from './objects/CaseAssetFileVersionInclude.schema';
import { CaseAssetFileVersionOrderByWithRelationInputObjectSchema as CaseAssetFileVersionOrderByWithRelationInputObjectSchema } from './objects/CaseAssetFileVersionOrderByWithRelationInput.schema';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './objects/CaseAssetFileVersionWhereInput.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './objects/CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionScalarFieldEnumSchema } from './enums/CaseAssetFileVersionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseAssetFileVersionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.CaseAssetFileVersionSelect> = z.object({
    id: z.boolean().optional(),
    caseAssetFileId: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    labId: z.boolean().optional(),
    storedFileId: z.boolean().optional(),
    versionNumber: z.boolean().optional(),
    createdByMemberId: z.boolean().optional(),
    createdByMemberIdSnapshot: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    asset: z.boolean().optional(),
    storedFile: z.boolean().optional(),
    createdByMember: z.boolean().optional(),
    currentForAsset: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionSelect>;

export const CaseAssetFileVersionFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    caseAssetFileId: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    labId: z.boolean().optional(),
    storedFileId: z.boolean().optional(),
    versionNumber: z.boolean().optional(),
    createdByMemberId: z.boolean().optional(),
    createdByMemberIdSnapshot: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    asset: z.boolean().optional(),
    storedFile: z.boolean().optional(),
    createdByMember: z.boolean().optional(),
    currentForAsset: z.boolean().optional()
  }).strict();

export const CaseAssetFileVersionFindFirstOrThrowSchema: z.ZodType<Prisma.CaseAssetFileVersionFindFirstOrThrowArgs> = z.object({ select: CaseAssetFileVersionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CaseAssetFileVersionIncludeObjectSchema.optional()), orderBy: z.union([CaseAssetFileVersionOrderByWithRelationInputObjectSchema, CaseAssetFileVersionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseAssetFileVersionWhereInputObjectSchema.optional(), cursor: CaseAssetFileVersionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseAssetFileVersionScalarFieldEnumSchema, CaseAssetFileVersionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileVersionFindFirstOrThrowArgs>;

export const CaseAssetFileVersionFindFirstOrThrowZodSchema = z.object({ select: CaseAssetFileVersionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CaseAssetFileVersionIncludeObjectSchema.optional()), orderBy: z.union([CaseAssetFileVersionOrderByWithRelationInputObjectSchema, CaseAssetFileVersionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseAssetFileVersionWhereInputObjectSchema.optional(), cursor: CaseAssetFileVersionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseAssetFileVersionScalarFieldEnumSchema, CaseAssetFileVersionScalarFieldEnumSchema.array()]).optional() }).strict();