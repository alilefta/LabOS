import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeSelectObjectSchema as SalesRepresentativeSelectObjectSchema } from './objects/SalesRepresentativeSelect.schema';
import { SalesRepresentativeIncludeObjectSchema as SalesRepresentativeIncludeObjectSchema } from './objects/SalesRepresentativeInclude.schema';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './objects/SalesRepresentativeWhereUniqueInput.schema';

export const SalesRepresentativeFindUniqueOrThrowSchema: z.ZodType<Prisma.SalesRepresentativeFindUniqueOrThrowArgs> = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), where: SalesRepresentativeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeFindUniqueOrThrowArgs>;

export const SalesRepresentativeFindUniqueOrThrowZodSchema = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), where: SalesRepresentativeWhereUniqueInputObjectSchema }).strict();