import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseSelectObjectSchema as CaseSelectObjectSchema } from './objects/CaseSelect.schema';
import { CaseIncludeObjectSchema as CaseIncludeObjectSchema } from './objects/CaseInclude.schema';
import { CaseUpdateInputObjectSchema as CaseUpdateInputObjectSchema } from './objects/CaseUpdateInput.schema';
import { CaseUncheckedUpdateInputObjectSchema as CaseUncheckedUpdateInputObjectSchema } from './objects/CaseUncheckedUpdateInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './objects/CaseWhereUniqueInput.schema';

export const CaseUpdateOneSchema: z.ZodType<Prisma.CaseUpdateArgs> = z.object({ select: CaseSelectObjectSchema.optional(), include: CaseIncludeObjectSchema.optional(), data: z.union([CaseUpdateInputObjectSchema, CaseUncheckedUpdateInputObjectSchema]), where: CaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseUpdateArgs>;

export const CaseUpdateOneZodSchema = z.object({ select: CaseSelectObjectSchema.optional(), include: CaseIncludeObjectSchema.optional(), data: z.union([CaseUpdateInputObjectSchema, CaseUncheckedUpdateInputObjectSchema]), where: CaseWhereUniqueInputObjectSchema }).strict();