import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseSelectObjectSchema as CaseSelectObjectSchema } from './objects/CaseSelect.schema';
import { CaseIncludeObjectSchema as CaseIncludeObjectSchema } from './objects/CaseInclude.schema';
import { CaseCreateInputObjectSchema as CaseCreateInputObjectSchema } from './objects/CaseCreateInput.schema';
import { CaseUncheckedCreateInputObjectSchema as CaseUncheckedCreateInputObjectSchema } from './objects/CaseUncheckedCreateInput.schema';

export const CaseCreateOneSchema: z.ZodType<Prisma.CaseCreateArgs> = z.object({ select: CaseSelectObjectSchema.optional(), include: CaseIncludeObjectSchema.optional(), data: z.union([CaseCreateInputObjectSchema, CaseUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseCreateArgs>;

export const CaseCreateOneZodSchema = z.object({ select: CaseSelectObjectSchema.optional(), include: CaseIncludeObjectSchema.optional(), data: z.union([CaseCreateInputObjectSchema, CaseUncheckedCreateInputObjectSchema]) }).strict();