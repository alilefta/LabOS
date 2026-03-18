import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeUpdateManyMutationInputObjectSchema as WorkTypeUpdateManyMutationInputObjectSchema } from './objects/WorkTypeUpdateManyMutationInput.schema';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './objects/WorkTypeWhereInput.schema';

export const WorkTypeUpdateManySchema: z.ZodType<Prisma.WorkTypeUpdateManyArgs> = z.object({ data: WorkTypeUpdateManyMutationInputObjectSchema, where: WorkTypeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WorkTypeUpdateManyArgs>;

export const WorkTypeUpdateManyZodSchema = z.object({ data: WorkTypeUpdateManyMutationInputObjectSchema, where: WorkTypeWhereInputObjectSchema.optional() }).strict();