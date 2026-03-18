import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeSelectObjectSchema as WorkTypeSelectObjectSchema } from './objects/WorkTypeSelect.schema';
import { WorkTypeUpdateManyMutationInputObjectSchema as WorkTypeUpdateManyMutationInputObjectSchema } from './objects/WorkTypeUpdateManyMutationInput.schema';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './objects/WorkTypeWhereInput.schema';

export const WorkTypeUpdateManyAndReturnSchema: z.ZodType<Prisma.WorkTypeUpdateManyAndReturnArgs> = z.object({ select: WorkTypeSelectObjectSchema.optional(), data: WorkTypeUpdateManyMutationInputObjectSchema, where: WorkTypeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WorkTypeUpdateManyAndReturnArgs>;

export const WorkTypeUpdateManyAndReturnZodSchema = z.object({ select: WorkTypeSelectObjectSchema.optional(), data: WorkTypeUpdateManyMutationInputObjectSchema, where: WorkTypeWhereInputObjectSchema.optional() }).strict();