import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogCreateManyInputObjectSchema as CaseActivityLogCreateManyInputObjectSchema } from './objects/CaseActivityLogCreateManyInput.schema';

export const CaseActivityLogCreateManySchema: z.ZodType<Prisma.CaseActivityLogCreateManyArgs> = z.object({ data: z.union([ CaseActivityLogCreateManyInputObjectSchema, z.array(CaseActivityLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogCreateManyArgs>;

export const CaseActivityLogCreateManyZodSchema = z.object({ data: z.union([ CaseActivityLogCreateManyInputObjectSchema, z.array(CaseActivityLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();