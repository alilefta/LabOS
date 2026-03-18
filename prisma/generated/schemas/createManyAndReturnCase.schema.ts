import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseSelectObjectSchema as CaseSelectObjectSchema } from './objects/CaseSelect.schema';
import { CaseCreateManyInputObjectSchema as CaseCreateManyInputObjectSchema } from './objects/CaseCreateManyInput.schema';

export const CaseCreateManyAndReturnSchema: z.ZodType<Prisma.CaseCreateManyAndReturnArgs> = z.object({ select: CaseSelectObjectSchema.optional(), data: z.union([ CaseCreateManyInputObjectSchema, z.array(CaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseCreateManyAndReturnArgs>;

export const CaseCreateManyAndReturnZodSchema = z.object({ select: CaseSelectObjectSchema.optional(), data: z.union([ CaseCreateManyInputObjectSchema, z.array(CaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();