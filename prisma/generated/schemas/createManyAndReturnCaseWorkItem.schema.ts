import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemSelectObjectSchema as CaseWorkItemSelectObjectSchema } from './objects/CaseWorkItemSelect.schema';
import { CaseWorkItemCreateManyInputObjectSchema as CaseWorkItemCreateManyInputObjectSchema } from './objects/CaseWorkItemCreateManyInput.schema';

export const CaseWorkItemCreateManyAndReturnSchema: z.ZodType<Prisma.CaseWorkItemCreateManyAndReturnArgs> = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), data: z.union([ CaseWorkItemCreateManyInputObjectSchema, z.array(CaseWorkItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemCreateManyAndReturnArgs>;

export const CaseWorkItemCreateManyAndReturnZodSchema = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), data: z.union([ CaseWorkItemCreateManyInputObjectSchema, z.array(CaseWorkItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();