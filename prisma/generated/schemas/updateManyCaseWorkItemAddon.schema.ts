import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemAddonUpdateManyMutationInputObjectSchema as CaseWorkItemAddonUpdateManyMutationInputObjectSchema } from './objects/CaseWorkItemAddonUpdateManyMutationInput.schema';
import { CaseWorkItemAddonWhereInputObjectSchema as CaseWorkItemAddonWhereInputObjectSchema } from './objects/CaseWorkItemAddonWhereInput.schema';

export const CaseWorkItemAddonUpdateManySchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateManyArgs> = z.object({ data: CaseWorkItemAddonUpdateManyMutationInputObjectSchema, where: CaseWorkItemAddonWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateManyArgs>;

export const CaseWorkItemAddonUpdateManyZodSchema = z.object({ data: CaseWorkItemAddonUpdateManyMutationInputObjectSchema, where: CaseWorkItemAddonWhereInputObjectSchema.optional() }).strict();