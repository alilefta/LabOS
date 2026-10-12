import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationUpdateManyMutationInputObjectSchema as ObjectStorageKeyAllocationUpdateManyMutationInputObjectSchema } from './objects/ObjectStorageKeyAllocationUpdateManyMutationInput.schema';
import { ObjectStorageKeyAllocationWhereInputObjectSchema as ObjectStorageKeyAllocationWhereInputObjectSchema } from './objects/ObjectStorageKeyAllocationWhereInput.schema';

export const ObjectStorageKeyAllocationUpdateManySchema: z.ZodType<Prisma.ObjectStorageKeyAllocationUpdateManyArgs> = z.object({ data: ObjectStorageKeyAllocationUpdateManyMutationInputObjectSchema, where: ObjectStorageKeyAllocationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationUpdateManyArgs>;

export const ObjectStorageKeyAllocationUpdateManyZodSchema = z.object({ data: ObjectStorageKeyAllocationUpdateManyMutationInputObjectSchema, where: ObjectStorageKeyAllocationWhereInputObjectSchema.optional() }).strict();