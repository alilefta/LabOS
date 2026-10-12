import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationSelectObjectSchema as ObjectStorageKeyAllocationSelectObjectSchema } from './objects/ObjectStorageKeyAllocationSelect.schema';
import { ObjectStorageKeyAllocationUpdateManyMutationInputObjectSchema as ObjectStorageKeyAllocationUpdateManyMutationInputObjectSchema } from './objects/ObjectStorageKeyAllocationUpdateManyMutationInput.schema';
import { ObjectStorageKeyAllocationWhereInputObjectSchema as ObjectStorageKeyAllocationWhereInputObjectSchema } from './objects/ObjectStorageKeyAllocationWhereInput.schema';

export const ObjectStorageKeyAllocationUpdateManyAndReturnSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationUpdateManyAndReturnArgs> = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(), data: ObjectStorageKeyAllocationUpdateManyMutationInputObjectSchema, where: ObjectStorageKeyAllocationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationUpdateManyAndReturnArgs>;

export const ObjectStorageKeyAllocationUpdateManyAndReturnZodSchema = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(), data: ObjectStorageKeyAllocationUpdateManyMutationInputObjectSchema, where: ObjectStorageKeyAllocationWhereInputObjectSchema.optional() }).strict();