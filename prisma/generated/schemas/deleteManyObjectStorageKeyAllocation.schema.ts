import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ObjectStorageKeyAllocationWhereInputObjectSchema as ObjectStorageKeyAllocationWhereInputObjectSchema } from './objects/ObjectStorageKeyAllocationWhereInput.schema';

export const ObjectStorageKeyAllocationDeleteManySchema: z.ZodType<Prisma.ObjectStorageKeyAllocationDeleteManyArgs> = z.object({ where: ObjectStorageKeyAllocationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationDeleteManyArgs>;

export const ObjectStorageKeyAllocationDeleteManyZodSchema = z.object({ where: ObjectStorageKeyAllocationWhereInputObjectSchema.optional() }).strict();