import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonSelectObjectSchema as CaseWorkItemAddonSelectObjectSchema } from './objects/CaseWorkItemAddonSelect.schema';
import { CaseWorkItemAddonIncludeObjectSchema as CaseWorkItemAddonIncludeObjectSchema } from './objects/CaseWorkItemAddonInclude.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './objects/CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonCreateInputObjectSchema as CaseWorkItemAddonCreateInputObjectSchema } from './objects/CaseWorkItemAddonCreateInput.schema';
import { CaseWorkItemAddonUncheckedCreateInputObjectSchema as CaseWorkItemAddonUncheckedCreateInputObjectSchema } from './objects/CaseWorkItemAddonUncheckedCreateInput.schema';
import { CaseWorkItemAddonUpdateInputObjectSchema as CaseWorkItemAddonUpdateInputObjectSchema } from './objects/CaseWorkItemAddonUpdateInput.schema';
import { CaseWorkItemAddonUncheckedUpdateInputObjectSchema as CaseWorkItemAddonUncheckedUpdateInputObjectSchema } from './objects/CaseWorkItemAddonUncheckedUpdateInput.schema';

export const CaseWorkItemAddonUpsertOneSchema: z.ZodType<Prisma.CaseWorkItemAddonUpsertArgs> = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), include: CaseWorkItemAddonIncludeObjectSchema.optional(), where: CaseWorkItemAddonWhereUniqueInputObjectSchema, create: z.union([ CaseWorkItemAddonCreateInputObjectSchema, CaseWorkItemAddonUncheckedCreateInputObjectSchema ]), update: z.union([ CaseWorkItemAddonUpdateInputObjectSchema, CaseWorkItemAddonUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpsertArgs>;

export const CaseWorkItemAddonUpsertOneZodSchema = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), include: CaseWorkItemAddonIncludeObjectSchema.optional(), where: CaseWorkItemAddonWhereUniqueInputObjectSchema, create: z.union([ CaseWorkItemAddonCreateInputObjectSchema, CaseWorkItemAddonUncheckedCreateInputObjectSchema ]), update: z.union([ CaseWorkItemAddonUpdateInputObjectSchema, CaseWorkItemAddonUncheckedUpdateInputObjectSchema ]) }).strict();