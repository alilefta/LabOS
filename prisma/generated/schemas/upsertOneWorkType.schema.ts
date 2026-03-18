import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeSelectObjectSchema as WorkTypeSelectObjectSchema } from './objects/WorkTypeSelect.schema';
import { WorkTypeIncludeObjectSchema as WorkTypeIncludeObjectSchema } from './objects/WorkTypeInclude.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './objects/WorkTypeWhereUniqueInput.schema';
import { WorkTypeCreateInputObjectSchema as WorkTypeCreateInputObjectSchema } from './objects/WorkTypeCreateInput.schema';
import { WorkTypeUncheckedCreateInputObjectSchema as WorkTypeUncheckedCreateInputObjectSchema } from './objects/WorkTypeUncheckedCreateInput.schema';
import { WorkTypeUpdateInputObjectSchema as WorkTypeUpdateInputObjectSchema } from './objects/WorkTypeUpdateInput.schema';
import { WorkTypeUncheckedUpdateInputObjectSchema as WorkTypeUncheckedUpdateInputObjectSchema } from './objects/WorkTypeUncheckedUpdateInput.schema';

export const WorkTypeUpsertOneSchema: z.ZodType<Prisma.WorkTypeUpsertArgs> = z.object({ select: WorkTypeSelectObjectSchema.optional(), include: WorkTypeIncludeObjectSchema.optional(), where: WorkTypeWhereUniqueInputObjectSchema, create: z.union([ WorkTypeCreateInputObjectSchema, WorkTypeUncheckedCreateInputObjectSchema ]), update: z.union([ WorkTypeUpdateInputObjectSchema, WorkTypeUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.WorkTypeUpsertArgs>;

export const WorkTypeUpsertOneZodSchema = z.object({ select: WorkTypeSelectObjectSchema.optional(), include: WorkTypeIncludeObjectSchema.optional(), where: WorkTypeWhereUniqueInputObjectSchema, create: z.union([ WorkTypeCreateInputObjectSchema, WorkTypeUncheckedCreateInputObjectSchema ]), update: z.union([ WorkTypeUpdateInputObjectSchema, WorkTypeUncheckedUpdateInputObjectSchema ]) }).strict();