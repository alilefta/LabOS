import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './objects/TechnicianWhereInput.schema';

export const TechnicianDeleteManySchema: z.ZodType<Prisma.TechnicianDeleteManyArgs> = z.object({ where: TechnicianWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TechnicianDeleteManyArgs>;

export const TechnicianDeleteManyZodSchema = z.object({ where: TechnicianWhereInputObjectSchema.optional() }).strict();