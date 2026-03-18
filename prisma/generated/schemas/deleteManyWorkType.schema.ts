import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './objects/WorkTypeWhereInput.schema';

export const WorkTypeDeleteManySchema: z.ZodType<Prisma.WorkTypeDeleteManyArgs> = z.object({ where: WorkTypeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WorkTypeDeleteManyArgs>;

export const WorkTypeDeleteManyZodSchema = z.object({ where: WorkTypeWhereInputObjectSchema.optional() }).strict();