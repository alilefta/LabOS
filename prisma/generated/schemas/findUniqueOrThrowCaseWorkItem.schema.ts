import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemSelectObjectSchema as CaseWorkItemSelectObjectSchema } from './objects/CaseWorkItemSelect.schema';
import { CaseWorkItemIncludeObjectSchema as CaseWorkItemIncludeObjectSchema } from './objects/CaseWorkItemInclude.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './objects/CaseWorkItemWhereUniqueInput.schema';

export const CaseWorkItemFindUniqueOrThrowSchema: z.ZodType<Prisma.CaseWorkItemFindUniqueOrThrowArgs> = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), include: CaseWorkItemIncludeObjectSchema.optional(), where: CaseWorkItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemFindUniqueOrThrowArgs>;

export const CaseWorkItemFindUniqueOrThrowZodSchema = z.object({ select: CaseWorkItemSelectObjectSchema.optional(), include: CaseWorkItemIncludeObjectSchema.optional(), where: CaseWorkItemWhereUniqueInputObjectSchema }).strict();