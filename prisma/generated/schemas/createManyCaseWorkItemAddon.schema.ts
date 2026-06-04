import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonCreateManyInputObjectSchema as CaseWorkItemAddonCreateManyInputObjectSchema } from './objects/CaseWorkItemAddonCreateManyInput.schema';

export const CaseWorkItemAddonCreateManySchema: z.ZodType<Prisma.CaseWorkItemAddonCreateManyArgs> = z.object({ data: z.union([ CaseWorkItemAddonCreateManyInputObjectSchema, z.array(CaseWorkItemAddonCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateManyArgs>;

export const CaseWorkItemAddonCreateManyZodSchema = z.object({ data: z.union([ CaseWorkItemAddonCreateManyInputObjectSchema, z.array(CaseWorkItemAddonCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();