import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationSelectObjectSchema as ObjectStorageKeyAllocationSelectObjectSchema } from './objects/ObjectStorageKeyAllocationSelect.schema';
import { ObjectStorageKeyAllocationUpdateInputObjectSchema as ObjectStorageKeyAllocationUpdateInputObjectSchema } from './objects/ObjectStorageKeyAllocationUpdateInput.schema';
import { ObjectStorageKeyAllocationUncheckedUpdateInputObjectSchema as ObjectStorageKeyAllocationUncheckedUpdateInputObjectSchema } from './objects/ObjectStorageKeyAllocationUncheckedUpdateInput.schema';
import { ObjectStorageKeyAllocationWhereUniqueInputObjectSchema as ObjectStorageKeyAllocationWhereUniqueInputObjectSchema } from './objects/ObjectStorageKeyAllocationWhereUniqueInput.schema';

export const ObjectStorageKeyAllocationUpdateOneSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationUpdateArgs> = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(),  data: z.union([ObjectStorageKeyAllocationUpdateInputObjectSchema, ObjectStorageKeyAllocationUncheckedUpdateInputObjectSchema]), where: ObjectStorageKeyAllocationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationUpdateArgs>;

export const ObjectStorageKeyAllocationUpdateOneZodSchema = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(),  data: z.union([ObjectStorageKeyAllocationUpdateInputObjectSchema, ObjectStorageKeyAllocationUncheckedUpdateInputObjectSchema]), where: ObjectStorageKeyAllocationWhereUniqueInputObjectSchema }).strict();