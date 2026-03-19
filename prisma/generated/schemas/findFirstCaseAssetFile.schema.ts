import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileIncludeObjectSchema as CaseAssetFileIncludeObjectSchema } from './objects/CaseAssetFileInclude.schema';
import { CaseAssetFileOrderByWithRelationInputObjectSchema as CaseAssetFileOrderByWithRelationInputObjectSchema } from './objects/CaseAssetFileOrderByWithRelationInput.schema';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './objects/CaseAssetFileWhereInput.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './objects/CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileScalarFieldEnumSchema } from './enums/CaseAssetFileScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseAssetFileFindFirstSelectSchema: z.ZodType<Prisma.CaseAssetFileSelect> = z.object({
    id: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    documentUrl: z.boolean().optional(),
    assetFileType: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileSelect>;

export const CaseAssetFileFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    documentUrl: z.boolean().optional(),
    assetFileType: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const CaseAssetFileFindFirstSchema: z.ZodType<Prisma.CaseAssetFileFindFirstArgs> = z.object({ select: CaseAssetFileFindFirstSelectSchema.optional(), include: z.lazy(() => CaseAssetFileIncludeObjectSchema.optional()), orderBy: z.union([CaseAssetFileOrderByWithRelationInputObjectSchema, CaseAssetFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseAssetFileWhereInputObjectSchema.optional(), cursor: CaseAssetFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseAssetFileScalarFieldEnumSchema, CaseAssetFileScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileFindFirstArgs>;

export const CaseAssetFileFindFirstZodSchema = z.object({ select: CaseAssetFileFindFirstSelectSchema.optional(), include: z.lazy(() => CaseAssetFileIncludeObjectSchema.optional()), orderBy: z.union([CaseAssetFileOrderByWithRelationInputObjectSchema, CaseAssetFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseAssetFileWhereInputObjectSchema.optional(), cursor: CaseAssetFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseAssetFileScalarFieldEnumSchema, CaseAssetFileScalarFieldEnumSchema.array()]).optional() }).strict();