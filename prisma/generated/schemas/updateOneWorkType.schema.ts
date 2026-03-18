import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeSelectObjectSchema as WorkTypeSelectObjectSchema } from './objects/WorkTypeSelect.schema';
import { WorkTypeIncludeObjectSchema as WorkTypeIncludeObjectSchema } from './objects/WorkTypeInclude.schema';
import { WorkTypeUpdateInputObjectSchema as WorkTypeUpdateInputObjectSchema } from './objects/WorkTypeUpdateInput.schema';
import { WorkTypeUncheckedUpdateInputObjectSchema as WorkTypeUncheckedUpdateInputObjectSchema } from './objects/WorkTypeUncheckedUpdateInput.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './objects/WorkTypeWhereUniqueInput.schema';

export const WorkTypeUpdateOneSchema: z.ZodType<Prisma.WorkTypeUpdateArgs> = z.object({ select: WorkTypeSelectObjectSchema.optional(), include: WorkTypeIncludeObjectSchema.optional(), data: z.union([WorkTypeUpdateInputObjectSchema, WorkTypeUncheckedUpdateInputObjectSchema]), where: WorkTypeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WorkTypeUpdateArgs>;

export const WorkTypeUpdateOneZodSchema = z.object({ select: WorkTypeSelectObjectSchema.optional(), include: WorkTypeIncludeObjectSchema.optional(), data: z.union([WorkTypeUpdateInputObjectSchema, WorkTypeUncheckedUpdateInputObjectSchema]), where: WorkTypeWhereUniqueInputObjectSchema }).strict();