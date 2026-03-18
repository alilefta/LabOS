import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeSelectObjectSchema as WorkTypeSelectObjectSchema } from './objects/WorkTypeSelect.schema';
import { WorkTypeIncludeObjectSchema as WorkTypeIncludeObjectSchema } from './objects/WorkTypeInclude.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './objects/WorkTypeWhereUniqueInput.schema';

export const WorkTypeFindUniqueOrThrowSchema: z.ZodType<Prisma.WorkTypeFindUniqueOrThrowArgs> = z.object({ select: WorkTypeSelectObjectSchema.optional(), include: WorkTypeIncludeObjectSchema.optional(), where: WorkTypeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WorkTypeFindUniqueOrThrowArgs>;

export const WorkTypeFindUniqueOrThrowZodSchema = z.object({ select: WorkTypeSelectObjectSchema.optional(), include: WorkTypeIncludeObjectSchema.optional(), where: WorkTypeWhereUniqueInputObjectSchema }).strict();