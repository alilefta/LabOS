import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './objects/DentistWhereInput.schema';

export const DentistDeleteManySchema: z.ZodType<Prisma.DentistDeleteManyArgs> = z.object({ where: DentistWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DentistDeleteManyArgs>;

export const DentistDeleteManyZodSchema = z.object({ where: DentistWhereInputObjectSchema.optional() }).strict();