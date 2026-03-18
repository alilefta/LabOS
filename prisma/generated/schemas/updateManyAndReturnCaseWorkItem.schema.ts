import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemSelectObjectSchema as CaseWorkItemSelectObjectSchema } from './objects/CaseWorkItemSelect.schema';
import { CaseWorkItemUpdateManyMutationInputObjectSchema as CaseWorkItemUpdateManyMutationInputObjectSchema } from './objects/CaseWorkItemUpdateManyMutationInput.schema';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './objects/CaseWorkItemWhereInput.schema';

export const CaseWorkItemUpdateManyAndReturnSchema: z.ZodType<Prisma.CaseWorkItemUpdateManyAndReturnArgs> = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), data: CaseWorkItemUpdateManyMutationInputObjectSchema, where: CaseWorkItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateManyAndReturnArgs>;

export const CaseWorkItemUpdateManyAndReturnZodSchema = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), data: CaseWorkItemUpdateManyMutationInputObjectSchema, where: CaseWorkItemWhereInputObjectSchema.optional() }).strict();