import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema as ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema } from './objects/ObjectStorageKeyAllocationOrderByWithRelationInput.schema';
import { ObjectStorageKeyAllocationWhereInputObjectSchema as ObjectStorageKeyAllocationWhereInputObjectSchema } from './objects/ObjectStorageKeyAllocationWhereInput.schema';
import { ObjectStorageKeyAllocationWhereUniqueInputObjectSchema as ObjectStorageKeyAllocationWhereUniqueInputObjectSchema } from './objects/ObjectStorageKeyAllocationWhereUniqueInput.schema';
import { ObjectStorageKeyAllocationScalarFieldEnumSchema } from './enums/ObjectStorageKeyAllocationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ObjectStorageKeyAllocationFindFirstSelectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationSelect> = z.object({
    objectKey: z.boolean().optional(),
    sourceUploadGrantId: z.boolean().optional(),
    latestWriteCapabilityExpiresAt: z.boolean().optional(),
    allocatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationSelect>;

export const ObjectStorageKeyAllocationFindFirstSelectZodSchema = z.object({
    objectKey: z.boolean().optional(),
    sourceUploadGrantId: z.boolean().optional(),
    latestWriteCapabilityExpiresAt: z.boolean().optional(),
    allocatedAt: z.boolean().optional()
  }).strict();

export const ObjectStorageKeyAllocationFindFirstSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationFindFirstArgs> = z.object({ select: ObjectStorageKeyAllocationFindFirstSelectSchema.optional(),  orderBy: z.union([ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema, ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema.array()]).optional(), where: ObjectStorageKeyAllocationWhereInputObjectSchema.optional(), cursor: ObjectStorageKeyAllocationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ObjectStorageKeyAllocationScalarFieldEnumSchema, ObjectStorageKeyAllocationScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationFindFirstArgs>;

export const ObjectStorageKeyAllocationFindFirstZodSchema = z.object({ select: ObjectStorageKeyAllocationFindFirstSelectSchema.optional(),  orderBy: z.union([ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema, ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema.array()]).optional(), where: ObjectStorageKeyAllocationWhereInputObjectSchema.optional(), cursor: ObjectStorageKeyAllocationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ObjectStorageKeyAllocationScalarFieldEnumSchema, ObjectStorageKeyAllocationScalarFieldEnumSchema.array()]).optional() }).strict();