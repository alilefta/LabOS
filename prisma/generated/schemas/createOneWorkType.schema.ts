import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeSelectObjectSchema as WorkTypeSelectObjectSchema } from './objects/WorkTypeSelect.schema';
import { WorkTypeIncludeObjectSchema as WorkTypeIncludeObjectSchema } from './objects/WorkTypeInclude.schema';
import { WorkTypeCreateInputObjectSchema as WorkTypeCreateInputObjectSchema } from './objects/WorkTypeCreateInput.schema';
import { WorkTypeUncheckedCreateInputObjectSchema as WorkTypeUncheckedCreateInputObjectSchema } from './objects/WorkTypeUncheckedCreateInput.schema';

export const WorkTypeCreateOneSchema: z.ZodType<Prisma.WorkTypeCreateArgs> = z.object({ select: WorkTypeSelectObjectSchema.optional(), include: WorkTypeIncludeObjectSchema.optional(), data: z.union([WorkTypeCreateInputObjectSchema, WorkTypeUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.WorkTypeCreateArgs>;

export const WorkTypeCreateOneZodSchema = z.object({ select: WorkTypeSelectObjectSchema.optional(), include: WorkTypeIncludeObjectSchema.optional(), data: z.union([WorkTypeCreateInputObjectSchema, WorkTypeUncheckedCreateInputObjectSchema]) }).strict();