import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemSelectObjectSchema as CaseWorkItemSelectObjectSchema } from './objects/CaseWorkItemSelect.schema';
import { CaseWorkItemIncludeObjectSchema as CaseWorkItemIncludeObjectSchema } from './objects/CaseWorkItemInclude.schema';
import { CaseWorkItemUpdateInputObjectSchema as CaseWorkItemUpdateInputObjectSchema } from './objects/CaseWorkItemUpdateInput.schema';
import { CaseWorkItemUncheckedUpdateInputObjectSchema as CaseWorkItemUncheckedUpdateInputObjectSchema } from './objects/CaseWorkItemUncheckedUpdateInput.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './objects/CaseWorkItemWhereUniqueInput.schema';

export const CaseWorkItemUpdateOneSchema: z.ZodType<Prisma.CaseWorkItemUpdateArgs> = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), include: CaseWorkItemIncludeObjectSchema.optional(), data: z.union([CaseWorkItemUpdateInputObjectSchema, CaseWorkItemUncheckedUpdateInputObjectSchema]), where: CaseWorkItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateArgs>;

export const CaseWorkItemUpdateOneZodSchema = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), include: CaseWorkItemIncludeObjectSchema.optional(), data: z.union([CaseWorkItemUpdateInputObjectSchema, CaseWorkItemUncheckedUpdateInputObjectSchema]), where: CaseWorkItemWhereUniqueInputObjectSchema }).strict();