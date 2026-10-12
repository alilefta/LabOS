import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationSelectObjectSchema as ObjectStorageKeyAllocationSelectObjectSchema } from './objects/ObjectStorageKeyAllocationSelect.schema';
import { ObjectStorageKeyAllocationCreateInputObjectSchema as ObjectStorageKeyAllocationCreateInputObjectSchema } from './objects/ObjectStorageKeyAllocationCreateInput.schema';
import { ObjectStorageKeyAllocationUncheckedCreateInputObjectSchema as ObjectStorageKeyAllocationUncheckedCreateInputObjectSchema } from './objects/ObjectStorageKeyAllocationUncheckedCreateInput.schema';

export const ObjectStorageKeyAllocationCreateOneSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationCreateArgs> = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(),  data: z.union([ObjectStorageKeyAllocationCreateInputObjectSchema, ObjectStorageKeyAllocationUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationCreateArgs>;

export const ObjectStorageKeyAllocationCreateOneZodSchema = z.object({ select: ObjectStorageKeyAllocationSelectObjectSchema.optional(),  data: z.union([ObjectStorageKeyAllocationCreateInputObjectSchema, ObjectStorageKeyAllocationUncheckedCreateInputObjectSchema]) }).strict();