import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './objects/CaseWorkItemWhereInput.schema';

export const CaseWorkItemDeleteManySchema: z.ZodType<Prisma.CaseWorkItemDeleteManyArgs> = z.object({ where: CaseWorkItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemDeleteManyArgs>;

export const CaseWorkItemDeleteManyZodSchema = z.object({ where: CaseWorkItemWhereInputObjectSchema.optional() }).strict();