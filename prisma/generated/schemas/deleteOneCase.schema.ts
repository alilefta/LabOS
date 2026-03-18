import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseSelectObjectSchema as CaseSelectObjectSchema } from './objects/CaseSelect.schema';
import { CaseIncludeObjectSchema as CaseIncludeObjectSchema } from './objects/CaseInclude.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './objects/CaseWhereUniqueInput.schema';

export const CaseDeleteOneSchema: z.ZodType<Prisma.CaseDeleteArgs> = z.object({ select: CaseSelectObjectSchema.optional(), include: CaseIncludeObjectSchema.optional(), where: CaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseDeleteArgs>;

export const CaseDeleteOneZodSchema = z.object({ select: CaseSelectObjectSchema.optional(), include: CaseIncludeObjectSchema.optional(), where: CaseWhereUniqueInputObjectSchema }).strict();