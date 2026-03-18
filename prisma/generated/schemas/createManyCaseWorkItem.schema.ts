import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemCreateManyInputObjectSchema as CaseWorkItemCreateManyInputObjectSchema } from './objects/CaseWorkItemCreateManyInput.schema';

export const CaseWorkItemCreateManySchema: z.ZodType<Prisma.CaseWorkItemCreateManyArgs> = z.object({ data: z.union([ CaseWorkItemCreateManyInputObjectSchema, z.array(CaseWorkItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemCreateManyArgs>;

export const CaseWorkItemCreateManyZodSchema = z.object({ data: z.union([ CaseWorkItemCreateManyInputObjectSchema, z.array(CaseWorkItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();