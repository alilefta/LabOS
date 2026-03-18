import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemSelectObjectSchema as CaseWorkItemSelectObjectSchema } from './objects/CaseWorkItemSelect.schema';
import { CaseWorkItemIncludeObjectSchema as CaseWorkItemIncludeObjectSchema } from './objects/CaseWorkItemInclude.schema';
import { CaseWorkItemCreateInputObjectSchema as CaseWorkItemCreateInputObjectSchema } from './objects/CaseWorkItemCreateInput.schema';
import { CaseWorkItemUncheckedCreateInputObjectSchema as CaseWorkItemUncheckedCreateInputObjectSchema } from './objects/CaseWorkItemUncheckedCreateInput.schema';

export const CaseWorkItemCreateOneSchema: z.ZodType<Prisma.CaseWorkItemCreateArgs> = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), include: CaseWorkItemIncludeObjectSchema.optional(), data: z.union([CaseWorkItemCreateInputObjectSchema, CaseWorkItemUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemCreateArgs>;

export const CaseWorkItemCreateOneZodSchema = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), include: CaseWorkItemIncludeObjectSchema.optional(), data: z.union([CaseWorkItemCreateInputObjectSchema, CaseWorkItemUncheckedCreateInputObjectSchema]) }).strict();