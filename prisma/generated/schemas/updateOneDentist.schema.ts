import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistSelectObjectSchema as DentistSelectObjectSchema } from './objects/DentistSelect.schema';
import { DentistIncludeObjectSchema as DentistIncludeObjectSchema } from './objects/DentistInclude.schema';
import { DentistUpdateInputObjectSchema as DentistUpdateInputObjectSchema } from './objects/DentistUpdateInput.schema';
import { DentistUncheckedUpdateInputObjectSchema as DentistUncheckedUpdateInputObjectSchema } from './objects/DentistUncheckedUpdateInput.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './objects/DentistWhereUniqueInput.schema';

export const DentistUpdateOneSchema: z.ZodType<Prisma.DentistUpdateArgs> = z.object({ select: DentistSelectObjectSchema.optional(), include: DentistIncludeObjectSchema.optional(), data: z.union([DentistUpdateInputObjectSchema, DentistUncheckedUpdateInputObjectSchema]), where: DentistWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DentistUpdateArgs>;

export const DentistUpdateOneZodSchema = z.object({ select: DentistSelectObjectSchema.optional(), include: DentistIncludeObjectSchema.optional(), data: z.union([DentistUpdateInputObjectSchema, DentistUncheckedUpdateInputObjectSchema]), where: DentistWhereUniqueInputObjectSchema }).strict();