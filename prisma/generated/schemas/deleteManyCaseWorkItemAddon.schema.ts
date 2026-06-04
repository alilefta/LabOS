import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonWhereInputObjectSchema as CaseWorkItemAddonWhereInputObjectSchema } from './objects/CaseWorkItemAddonWhereInput.schema';

export const CaseWorkItemAddonDeleteManySchema: z.ZodType<Prisma.CaseWorkItemAddonDeleteManyArgs> = z.object({ where: CaseWorkItemAddonWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonDeleteManyArgs>;

export const CaseWorkItemAddonDeleteManyZodSchema = z.object({ where: CaseWorkItemAddonWhereInputObjectSchema.optional() }).strict();