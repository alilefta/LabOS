import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeSelectObjectSchema as SalesRepresentativeSelectObjectSchema } from './objects/SalesRepresentativeSelect.schema';
import { SalesRepresentativeIncludeObjectSchema as SalesRepresentativeIncludeObjectSchema } from './objects/SalesRepresentativeInclude.schema';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './objects/SalesRepresentativeWhereUniqueInput.schema';

export const SalesRepresentativeDeleteOneSchema: z.ZodType<Prisma.SalesRepresentativeDeleteArgs> = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), where: SalesRepresentativeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeDeleteArgs>;

export const SalesRepresentativeDeleteOneZodSchema = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), where: SalesRepresentativeWhereUniqueInputObjectSchema }).strict();