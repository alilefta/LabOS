import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationSelectObjectSchema as ObjectStorageKeyAllocationSelectObjectSchema } from './objects/ObjectStorageKeyAllocationSelect.schema';
import { ObjectStorageKeyAllocationWhereUniqueInputObjectSchema as ObjectStorageKeyAllocationWhereUniqueInputObjectSchema } from './objects/ObjectStorageKeyAllocationWhereUniqueInput.schema';

export const ObjectStorageKeyAllocationDeleteOneSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationDeleteArgs> = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(),  where: ObjectStorageKeyAllocationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationDeleteArgs>;

export const ObjectStorageKeyAllocationDeleteOneZodSchema = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(),  where: ObjectStorageKeyAllocationWhereUniqueInputObjectSchema }).strict();