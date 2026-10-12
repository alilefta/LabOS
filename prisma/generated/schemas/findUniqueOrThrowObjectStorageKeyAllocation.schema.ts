import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationSelectObjectSchema as ObjectStorageKeyAllocationSelectObjectSchema } from './objects/ObjectStorageKeyAllocationSelect.schema';
import { ObjectStorageKeyAllocationWhereUniqueInputObjectSchema as ObjectStorageKeyAllocationWhereUniqueInputObjectSchema } from './objects/ObjectStorageKeyAllocationWhereUniqueInput.schema';

export const ObjectStorageKeyAllocationFindUniqueOrThrowSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationFindUniqueOrThrowArgs> = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(),  where: ObjectStorageKeyAllocationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationFindUniqueOrThrowArgs>;

export const ObjectStorageKeyAllocationFindUniqueOrThrowZodSchema = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(),  where: ObjectStorageKeyAllocationWhereUniqueInputObjectSchema }).strict();