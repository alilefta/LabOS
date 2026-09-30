import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileIncludeObjectSchema as StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileOrderByWithRelationInputObjectSchema as StoredFileOrderByWithRelationInputObjectSchema } from './objects/StoredFileOrderByWithRelationInput.schema';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './objects/StoredFileWhereInput.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';
import { StoredFileScalarFieldEnumSchema } from './enums/StoredFileScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const StoredFileFindFirstOrThrowSelectSchema: z.ZodType<Prisma.StoredFileSelect> = z.object({
    id: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    labId: z.boolean().optional(),
    sourceUploadGrantId: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerObjectKey: z.boolean().optional(),
    purpose: z.boolean().optional(),
    detectedMimeType: z.boolean().optional(),
    sizeBytes: z.boolean().optional(),
    checksumAlgorithm: z.boolean().optional(),
    checksumValue: z.boolean().optional(),
    uploaderMemberId: z.boolean().optional(),
    uploaderMemberIdSnapshot: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    organization: z.boolean().optional(),
    lab: z.boolean().optional(),
    sourceGrant: z.boolean().optional(),
    uploaderMember: z.boolean().optional(),
    caseVersion: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.StoredFileSelect>;

export const StoredFileFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    labId: z.boolean().optional(),
    sourceUploadGrantId: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerObjectKey: z.boolean().optional(),
    purpose: z.boolean().optional(),
    detectedMimeType: z.boolean().optional(),
    sizeBytes: z.boolean().optional(),
    checksumAlgorithm: z.boolean().optional(),
    checksumValue: z.boolean().optional(),
    uploaderMemberId: z.boolean().optional(),
    uploaderMemberIdSnapshot: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    organization: z.boolean().optional(),
    lab: z.boolean().optional(),
    sourceGrant: z.boolean().optional(),
    uploaderMember: z.boolean().optional(),
    caseVersion: z.boolean().optional()
  }).strict();

export const StoredFileFindFirstOrThrowSchema: z.ZodType<Prisma.StoredFileFindFirstOrThrowArgs> = z.object({ select: StoredFileFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => StoredFileIncludeObjectSchema.optional()), orderBy: z.union([StoredFileOrderByWithRelationInputObjectSchema, StoredFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoredFileWhereInputObjectSchema.optional(), cursor: StoredFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StoredFileScalarFieldEnumSchema, StoredFileScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.StoredFileFindFirstOrThrowArgs>;

export const StoredFileFindFirstOrThrowZodSchema = z.object({ select: StoredFileFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => StoredFileIncludeObjectSchema.optional()), orderBy: z.union([StoredFileOrderByWithRelationInputObjectSchema, StoredFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoredFileWhereInputObjectSchema.optional(), cursor: StoredFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StoredFileScalarFieldEnumSchema, StoredFileScalarFieldEnumSchema.array()]).optional() }).strict();