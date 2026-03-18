import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeSelectObjectSchema as SalesRepresentativeSelectObjectSchema } from './objects/SalesRepresentativeSelect.schema';
import { SalesRepresentativeIncludeObjectSchema as SalesRepresentativeIncludeObjectSchema } from './objects/SalesRepresentativeInclude.schema';
import { SalesRepresentativeUpdateInputObjectSchema as SalesRepresentativeUpdateInputObjectSchema } from './objects/SalesRepresentativeUpdateInput.schema';
import { SalesRepresentativeUncheckedUpdateInputObjectSchema as SalesRepresentativeUncheckedUpdateInputObjectSchema } from './objects/SalesRepresentativeUncheckedUpdateInput.schema';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './objects/SalesRepresentativeWhereUniqueInput.schema';

export const SalesRepresentativeUpdateOneSchema: z.ZodType<Prisma.SalesRepresentativeUpdateArgs> = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), data: z.union([SalesRepresentativeUpdateInputObjectSchema, SalesRepresentativeUncheckedUpdateInputObjectSchema]), where: SalesRepresentativeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeUpdateArgs>;

export const SalesRepresentativeUpdateOneZodSchema = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), data: z.union([SalesRepresentativeUpdateInputObjectSchema, SalesRepresentativeUncheckedUpdateInputObjectSchema]), where: SalesRepresentativeWhereUniqueInputObjectSchema }).strict();