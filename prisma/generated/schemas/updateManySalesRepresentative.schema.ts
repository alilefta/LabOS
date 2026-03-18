import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeUpdateManyMutationInputObjectSchema as SalesRepresentativeUpdateManyMutationInputObjectSchema } from './objects/SalesRepresentativeUpdateManyMutationInput.schema';
import { SalesRepresentativeWhereInputObjectSchema as SalesRepresentativeWhereInputObjectSchema } from './objects/SalesRepresentativeWhereInput.schema';

export const SalesRepresentativeUpdateManySchema: z.ZodType<Prisma.SalesRepresentativeUpdateManyArgs> = z.object({ data: SalesRepresentativeUpdateManyMutationInputObjectSchema, where: SalesRepresentativeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeUpdateManyArgs>;

export const SalesRepresentativeUpdateManyZodSchema = z.object({ data: SalesRepresentativeUpdateManyMutationInputObjectSchema, where: SalesRepresentativeWhereInputObjectSchema.optional() }).strict();