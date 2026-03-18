import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemUpdateManyMutationInputObjectSchema as CaseWorkItemUpdateManyMutationInputObjectSchema } from './objects/CaseWorkItemUpdateManyMutationInput.schema';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './objects/CaseWorkItemWhereInput.schema';

export const CaseWorkItemUpdateManySchema: z.ZodType<Prisma.CaseWorkItemUpdateManyArgs> = z.object({ data: CaseWorkItemUpdateManyMutationInputObjectSchema, where: CaseWorkItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateManyArgs>;

export const CaseWorkItemUpdateManyZodSchema = z.object({ data: CaseWorkItemUpdateManyMutationInputObjectSchema, where: CaseWorkItemWhereInputObjectSchema.optional() }).strict();