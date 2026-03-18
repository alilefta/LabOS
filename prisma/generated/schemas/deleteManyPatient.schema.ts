import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './objects/PatientWhereInput.schema';

export const PatientDeleteManySchema: z.ZodType<Prisma.PatientDeleteManyArgs> = z.object({ where: PatientWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PatientDeleteManyArgs>;

export const PatientDeleteManyZodSchema = z.object({ where: PatientWhereInputObjectSchema.optional() }).strict();