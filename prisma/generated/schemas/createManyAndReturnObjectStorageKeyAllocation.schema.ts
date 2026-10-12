import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationSelectObjectSchema as ObjectStorageKeyAllocationSelectObjectSchema } from './objects/ObjectStorageKeyAllocationSelect.schema';
import { ObjectStorageKeyAllocationCreateManyInputObjectSchema as ObjectStorageKeyAllocationCreateManyInputObjectSchema } from './objects/ObjectStorageKeyAllocationCreateManyInput.schema';

export const ObjectStorageKeyAllocationCreateManyAndReturnSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationCreateManyAndReturnArgs> = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(), data: z.union([ ObjectStorageKeyAllocationCreateManyInputObjectSchema, z.array(ObjectStorageKeyAllocationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationCreateManyAndReturnArgs>;

export const ObjectStorageKeyAllocationCreateManyAndReturnZodSchema = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(), data: z.union([ ObjectStorageKeyAllocationCreateManyInputObjectSchema, z.array(ObjectStorageKeyAllocationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();