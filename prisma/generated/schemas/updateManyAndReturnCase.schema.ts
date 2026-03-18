import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseSelectObjectSchema as CaseSelectObjectSchema } from './objects/CaseSelect.schema';
import { CaseUpdateManyMutationInputObjectSchema as CaseUpdateManyMutationInputObjectSchema } from './objects/CaseUpdateManyMutationInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './objects/CaseWhereInput.schema';

export const CaseUpdateManyAndReturnSchema: z.ZodType<Prisma.CaseUpdateManyAndReturnArgs> = z.object({ select: CaseSelectObjectSchema.optional(), data: CaseUpdateManyMutationInputObjectSchema, where: CaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseUpdateManyAndReturnArgs>;

export const CaseUpdateManyAndReturnZodSchema = z.object({ select: CaseSelectObjectSchema.optional(), data: CaseUpdateManyMutationInputObjectSchema, where: CaseWhereInputObjectSchema.optional() }).strict();