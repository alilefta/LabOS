import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema as ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema } from './objects/ObjectStorageKeyAllocationOrderByWithRelationInput.schema';
import { ObjectStorageKeyAllocationWhereInputObjectSchema as ObjectStorageKeyAllocationWhereInputObjectSchema } from './objects/ObjectStorageKeyAllocationWhereInput.schema';
import { ObjectStorageKeyAllocationWhereUniqueInputObjectSchema as ObjectStorageKeyAllocationWhereUniqueInputObjectSchema } from './objects/ObjectStorageKeyAllocationWhereUniqueInput.schema';
import { ObjectStorageKeyAllocationScalarFieldEnumSchema } from './enums/ObjectStorageKeyAllocationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ObjectStorageKeyAllocationFindManySelectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationSelect> = z.object({
    objectKey: z.boolean().optional(),
    sourceUploadGrantId: z.boolean().optional(),
    latestWriteCapabilityExpiresAt: z.boolean().optional(),
    allocatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationSelect>;

export const ObjectStorageKeyAllocationFindManySelectZodSchema = z.object({
    objectKey: z.boolean().optional(),
    sourceUploadGrantId: z.boolean().optional(),
    latestWriteCapabilityExpiresAt: z.boolean().optional(),
    allocatedAt: z.boolean().optional()
  }).strict();

export const ObjectStorageKeyAllocationFindManySchema: z.ZodType<Prisma.ObjectStorageKeyAllocationFindManyArgs> = z.object({ select: ObjectStorageKeyAllocationFindManySelectSchema.optional(),  orderBy: z.union([ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema, ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema.array()]).optional(), where: ObjectStorageKeyAllocationWhereInputObjectSchema.optional(), cursor: ObjectStorageKeyAllocationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ObjectStorageKeyAllocationScalarFieldEnumSchema, ObjectStorageKeyAllocationScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationFindManyArgs>;

export const ObjectStorageKeyAllocationFindManyZodSchema = z.object({ select: ObjectStorageKeyAllocationFindManySelectSchema.optional(),  orderBy: z.union([ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema, ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema.array()]).optional(), where: ObjectStorageKeyAllocationWhereInputObjectSchema.optional(), cursor: ObjectStorageKeyAllocationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ObjectStorageKeyAllocationScalarFieldEnumSchema, ObjectStorageKeyAllocationScalarFieldEnumSchema.array()]).optional() }).strict();