import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeSelectObjectSchema as SalesRepresentativeSelectObjectSchema } from './objects/SalesRepresentativeSelect.schema';
import { SalesRepresentativeIncludeObjectSchema as SalesRepresentativeIncludeObjectSchema } from './objects/SalesRepresentativeInclude.schema';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './objects/SalesRepresentativeWhereUniqueInput.schema';

export const SalesRepresentativeFindUniqueSchema: z.ZodType<Prisma.SalesRepresentativeFindUniqueArgs> = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), where: SalesRepresentativeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeFindUniqueArgs>;

export const SalesRepresentativeFindUniqueZodSchema = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), where: SalesRepresentativeWhereUniqueInputObjectSchema }).strict();