import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantIncludeObjectSchema as FileUploadGrantIncludeObjectSchema } from './objects/FileUploadGrantInclude.schema';
import { FileUploadGrantOrderByWithRelationInputObjectSchema as FileUploadGrantOrderByWithRelationInputObjectSchema } from './objects/FileUploadGrantOrderByWithRelationInput.schema';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './objects/FileUploadGrantWhereInput.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './objects/FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantScalarFieldEnumSchema } from './enums/FileUploadGrantScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FileUploadGrantFindFirstSelectSchema: z.ZodType<Prisma.FileUploadGrantSelect> = z.object({
    id: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    organization: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    createdByMemberId: z.boolean().optional(),
    createdByMember: z.boolean().optional(),
    boundaryId: z.boolean().optional(),
    purpose: z.boolean().optional(),
    targetType: z.boolean().optional(),
    targetId: z.boolean().optional(),
    status: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerFileKey: z.boolean().optional(),
    providerFileUrl: z.boolean().optional(),
    correlationId: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    uploadedAt: z.boolean().optional(),
    consumedAt: z.boolean().optional(),
    expiredAt: z.boolean().optional(),
    failedAt: z.boolean().optional(),
    failureCode: z.boolean().optional(),
    providerDeletedAt: z.boolean().optional(),
    cleanupAttemptCount: z.boolean().optional(),
    lastCleanupAttemptAt: z.boolean().optional(),
    cleanupFailureCode: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    storedFile: z.boolean().optional(),
    clinicalUploadEvidence: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantSelect>;

export const FileUploadGrantFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    organization: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    createdByMemberId: z.boolean().optional(),
    createdByMember: z.boolean().optional(),
    boundaryId: z.boolean().optional(),
    purpose: z.boolean().optional(),
    targetType: z.boolean().optional(),
    targetId: z.boolean().optional(),
    status: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerFileKey: z.boolean().optional(),
    providerFileUrl: z.boolean().optional(),
    correlationId: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    uploadedAt: z.boolean().optional(),
    consumedAt: z.boolean().optional(),
    expiredAt: z.boolean().optional(),
    failedAt: z.boolean().optional(),
    failureCode: z.boolean().optional(),
    providerDeletedAt: z.boolean().optional(),
    cleanupAttemptCount: z.boolean().optional(),
    lastCleanupAttemptAt: z.boolean().optional(),
    cleanupFailureCode: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    storedFile: z.boolean().optional(),
    clinicalUploadEvidence: z.boolean().optional()
  }).strict();

export const FileUploadGrantFindFirstSchema: z.ZodType<Prisma.FileUploadGrantFindFirstArgs> = z.object({ select: FileUploadGrantFindFirstSelectSchema.optional(), include: z.lazy(() => FileUploadGrantIncludeObjectSchema.optional()), orderBy: z.union([FileUploadGrantOrderByWithRelationInputObjectSchema, FileUploadGrantOrderByWithRelationInputObjectSchema.array()]).optional(), where: FileUploadGrantWhereInputObjectSchema.optional(), cursor: FileUploadGrantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FileUploadGrantScalarFieldEnumSchema, FileUploadGrantScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantFindFirstArgs>;

export const FileUploadGrantFindFirstZodSchema = z.object({ select: FileUploadGrantFindFirstSelectSchema.optional(), include: z.lazy(() => FileUploadGrantIncludeObjectSchema.optional()), orderBy: z.union([FileUploadGrantOrderByWithRelationInputObjectSchema, FileUploadGrantOrderByWithRelationInputObjectSchema.array()]).optional(), where: FileUploadGrantWhereInputObjectSchema.optional(), cursor: FileUploadGrantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FileUploadGrantScalarFieldEnumSchema, FileUploadGrantScalarFieldEnumSchema.array()]).optional() }).strict();