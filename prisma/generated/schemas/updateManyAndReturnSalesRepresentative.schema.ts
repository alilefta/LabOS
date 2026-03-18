import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeSelectObjectSchema as SalesRepresentativeSelectObjectSchema } from './objects/SalesRepresentativeSelect.schema';
import { SalesRepresentativeUpdateManyMutationInputObjectSchema as SalesRepresentativeUpdateManyMutationInputObjectSchema } from './objects/SalesRepresentativeUpdateManyMutationInput.schema';
import { SalesRepresentativeWhereInputObjectSchema as SalesRepresentativeWhereInputObjectSchema } from './objects/SalesRepresentativeWhereInput.schema';

export const SalesRepresentativeUpdateManyAndReturnSchema: z.ZodType<Prisma.SalesRepresentativeUpdateManyAndReturnArgs> = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), data: SalesRepresentativeUpdateManyMutationInputObjectSchema, where: SalesRepresentativeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeUpdateManyAndReturnArgs>;

export const SalesRepresentativeUpdateManyAndReturnZodSchema = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), data: SalesRepresentativeUpdateManyMutationInputObjectSchema, where: SalesRepresentativeWhereInputObjectSchema.optional() }).strict();