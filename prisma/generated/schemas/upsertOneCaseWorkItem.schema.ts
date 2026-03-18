import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemSelectObjectSchema as CaseWorkItemSelectObjectSchema } from './objects/CaseWorkItemSelect.schema';
import { CaseWorkItemIncludeObjectSchema as CaseWorkItemIncludeObjectSchema } from './objects/CaseWorkItemInclude.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './objects/CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemCreateInputObjectSchema as CaseWorkItemCreateInputObjectSchema } from './objects/CaseWorkItemCreateInput.schema';
import { CaseWorkItemUncheckedCreateInputObjectSchema as CaseWorkItemUncheckedCreateInputObjectSchema } from './objects/CaseWorkItemUncheckedCreateInput.schema';
import { CaseWorkItemUpdateInputObjectSchema as CaseWorkItemUpdateInputObjectSchema } from './objects/CaseWorkItemUpdateInput.schema';
import { CaseWorkItemUncheckedUpdateInputObjectSchema as CaseWorkItemUncheckedUpdateInputObjectSchema } from './objects/CaseWorkItemUncheckedUpdateInput.schema';

export const CaseWorkItemUpsertOneSchema: z.ZodType<Prisma.CaseWorkItemUpsertArgs> = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), include: CaseWorkItemIncludeObjectSchema.optional(), where: CaseWorkItemWhereUniqueInputObjectSchema, create: z.union([ CaseWorkItemCreateInputObjectSchema, CaseWorkItemUncheckedCreateInputObjectSchema ]), update: z.union([ CaseWorkItemUpdateInputObjectSchema, CaseWorkItemUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemUpsertArgs>;

export const CaseWorkItemUpsertOneZodSchema = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), include: CaseWorkItemIncludeObjectSchema.optional(), where: CaseWorkItemWhereUniqueInputObjectSchema, create: z.union([ CaseWorkItemCreateInputObjectSchema, CaseWorkItemUncheckedCreateInputObjectSchema ]), update: z.union([ CaseWorkItemUpdateInputObjectSchema, CaseWorkItemUncheckedUpdateInputObjectSchema ]) }).strict();