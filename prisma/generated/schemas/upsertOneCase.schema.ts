import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseSelectObjectSchema as CaseSelectObjectSchema } from './objects/CaseSelect.schema';
import { CaseIncludeObjectSchema as CaseIncludeObjectSchema } from './objects/CaseInclude.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './objects/CaseWhereUniqueInput.schema';
import { CaseCreateInputObjectSchema as CaseCreateInputObjectSchema } from './objects/CaseCreateInput.schema';
import { CaseUncheckedCreateInputObjectSchema as CaseUncheckedCreateInputObjectSchema } from './objects/CaseUncheckedCreateInput.schema';
import { CaseUpdateInputObjectSchema as CaseUpdateInputObjectSchema } from './objects/CaseUpdateInput.schema';
import { CaseUncheckedUpdateInputObjectSchema as CaseUncheckedUpdateInputObjectSchema } from './objects/CaseUncheckedUpdateInput.schema';

export const CaseUpsertOneSchema: z.ZodType<Prisma.CaseUpsertArgs> = z.object({ select: CaseSelectObjectSchema.optional(), include: CaseIncludeObjectSchema.optional(), where: CaseWhereUniqueInputObjectSchema, create: z.union([ CaseCreateInputObjectSchema, CaseUncheckedCreateInputObjectSchema ]), update: z.union([ CaseUpdateInputObjectSchema, CaseUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseUpsertArgs>;

export const CaseUpsertOneZodSchema = z.object({ select: CaseSelectObjectSchema.optional(), include: CaseIncludeObjectSchema.optional(), where: CaseWhereUniqueInputObjectSchema, create: z.union([ CaseCreateInputObjectSchema, CaseUncheckedCreateInputObjectSchema ]), update: z.union([ CaseUpdateInputObjectSchema, CaseUncheckedUpdateInputObjectSchema ]) }).strict();