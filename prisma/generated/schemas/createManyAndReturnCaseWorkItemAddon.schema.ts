import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonSelectObjectSchema as CaseWorkItemAddonSelectObjectSchema } from './objects/CaseWorkItemAddonSelect.schema';
import { CaseWorkItemAddonCreateManyInputObjectSchema as CaseWorkItemAddonCreateManyInputObjectSchema } from './objects/CaseWorkItemAddonCreateManyInput.schema';

export const CaseWorkItemAddonCreateManyAndReturnSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateManyAndReturnArgs> = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), data: z.union([ CaseWorkItemAddonCreateManyInputObjectSchema, z.array(CaseWorkItemAddonCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateManyAndReturnArgs>;

export const CaseWorkItemAddonCreateManyAndReturnZodSchema = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), data: z.union([ CaseWorkItemAddonCreateManyInputObjectSchema, z.array(CaseWorkItemAddonCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();