import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './objects/ClinicWhereInput.schema';

export const ClinicDeleteManySchema: z.ZodType<Prisma.ClinicDeleteManyArgs> = z.object({ where: ClinicWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ClinicDeleteManyArgs>;

export const ClinicDeleteManyZodSchema = z.object({ where: ClinicWhereInputObjectSchema.optional() }).strict();