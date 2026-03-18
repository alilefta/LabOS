import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeSelectObjectSchema as SalesRepresentativeSelectObjectSchema } from './objects/SalesRepresentativeSelect.schema';
import { SalesRepresentativeIncludeObjectSchema as SalesRepresentativeIncludeObjectSchema } from './objects/SalesRepresentativeInclude.schema';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './objects/SalesRepresentativeWhereUniqueInput.schema';
import { SalesRepresentativeCreateInputObjectSchema as SalesRepresentativeCreateInputObjectSchema } from './objects/SalesRepresentativeCreateInput.schema';
import { SalesRepresentativeUncheckedCreateInputObjectSchema as SalesRepresentativeUncheckedCreateInputObjectSchema } from './objects/SalesRepresentativeUncheckedCreateInput.schema';
import { SalesRepresentativeUpdateInputObjectSchema as SalesRepresentativeUpdateInputObjectSchema } from './objects/SalesRepresentativeUpdateInput.schema';
import { SalesRepresentativeUncheckedUpdateInputObjectSchema as SalesRepresentativeUncheckedUpdateInputObjectSchema } from './objects/SalesRepresentativeUncheckedUpdateInput.schema';

export const SalesRepresentativeUpsertOneSchema: z.ZodType<Prisma.SalesRepresentativeUpsertArgs> = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), where: SalesRepresentativeWhereUniqueInputObjectSchema, create: z.union([ SalesRepresentativeCreateInputObjectSchema, SalesRepresentativeUncheckedCreateInputObjectSchema ]), update: z.union([ SalesRepresentativeUpdateInputObjectSchema, SalesRepresentativeUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeUpsertArgs>;

export const SalesRepresentativeUpsertOneZodSchema = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), where: SalesRepresentativeWhereUniqueInputObjectSchema, create: z.union([ SalesRepresentativeCreateInputObjectSchema, SalesRepresentativeUncheckedCreateInputObjectSchema ]), update: z.union([ SalesRepresentativeUpdateInputObjectSchema, SalesRepresentativeUncheckedUpdateInputObjectSchema ]) }).strict();