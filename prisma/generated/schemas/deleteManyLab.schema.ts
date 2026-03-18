import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './objects/LabWhereInput.schema';

export const LabDeleteManySchema: z.ZodType<Prisma.LabDeleteManyArgs> = z.object({ where: LabWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabDeleteManyArgs>;

export const LabDeleteManyZodSchema = z.object({ where: LabWhereInputObjectSchema.optional() }).strict();