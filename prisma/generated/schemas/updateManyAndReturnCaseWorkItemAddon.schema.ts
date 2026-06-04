import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonSelectObjectSchema as CaseWorkItemAddonSelectObjectSchema } from './objects/CaseWorkItemAddonSelect.schema';
import { CaseWorkItemAddonUpdateManyMutationInputObjectSchema as CaseWorkItemAddonUpdateManyMutationInputObjectSchema } from './objects/CaseWorkItemAddonUpdateManyMutationInput.schema';
import { CaseWorkItemAddonWhereInputObjectSchema as CaseWorkItemAddonWhereInputObjectSchema } from './objects/CaseWorkItemAddonWhereInput.schema';

export const CaseWorkItemAddonUpdateManyAndReturnSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateManyAndReturnArgs> = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), data: CaseWorkItemAddonUpdateManyMutationInputObjectSchema, where: CaseWorkItemAddonWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateManyAndReturnArgs>;

export const CaseWorkItemAddonUpdateManyAndReturnZodSchema = z.object({ select: CaseWorkItemAddonSelectObjectSchema.optional(), data: CaseWorkItemAddonUpdateManyMutationInputObjectSchema, where: CaseWorkItemAddonWhereInputObjectSchema.optional() }).strict();