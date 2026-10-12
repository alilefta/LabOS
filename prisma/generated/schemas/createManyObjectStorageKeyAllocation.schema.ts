import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationCreateManyInputObjectSchema as ObjectStorageKeyAllocationCreateManyInputObjectSchema } from './objects/ObjectStorageKeyAllocationCreateManyInput.schema';

export const ObjectStorageKeyAllocationCreateManySchema: z.ZodType<Prisma.ObjectStorageKeyAllocationCreateManyArgs> = z.object({ data: z.union([ ObjectStorageKeyAllocationCreateManyInputObjectSchema, z.array(ObjectStorageKeyAllocationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationCreateManyArgs>;

export const ObjectStorageKeyAllocationCreateManyZodSchema = z.object({ data: z.union([ ObjectStorageKeyAllocationCreateManyInputObjectSchema, z.array(ObjectStorageKeyAllocationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();