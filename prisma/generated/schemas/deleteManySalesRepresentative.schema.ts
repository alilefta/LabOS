import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeWhereInputObjectSchema as SalesRepresentativeWhereInputObjectSchema } from './objects/SalesRepresentativeWhereInput.schema';

export const SalesRepresentativeDeleteManySchema: z.ZodType<Prisma.SalesRepresentativeDeleteManyArgs> = z.object({ where: SalesRepresentativeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeDeleteManyArgs>;

export const SalesRepresentativeDeleteManyZodSchema = z.object({ where: SalesRepresentativeWhereInputObjectSchema.optional() }).strict();