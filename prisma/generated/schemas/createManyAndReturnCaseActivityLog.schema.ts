import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogSelectObjectSchema as CaseActivityLogSelectObjectSchema } from './objects/CaseActivityLogSelect.schema';
import { CaseActivityLogCreateManyInputObjectSchema as CaseActivityLogCreateManyInputObjectSchema } from './objects/CaseActivityLogCreateManyInput.schema';

export const CaseActivityLogCreateManyAndReturnSchema: z.ZodType<Prisma.CaseActivityLogCreateManyAndReturnArgs> = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), data: z.union([ CaseActivityLogCreateManyInputObjectSchema, z.array(CaseActivityLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogCreateManyAndReturnArgs>;

export const CaseActivityLogCreateManyAndReturnZodSchema = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), data: z.union([ CaseActivityLogCreateManyInputObjectSchema, z.array(CaseActivityLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();