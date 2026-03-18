import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeSelectObjectSchema as SalesRepresentativeSelectObjectSchema } from './objects/SalesRepresentativeSelect.schema';
import { SalesRepresentativeCreateManyInputObjectSchema as SalesRepresentativeCreateManyInputObjectSchema } from './objects/SalesRepresentativeCreateManyInput.schema';

export const SalesRepresentativeCreateManyAndReturnSchema: z.ZodType<Prisma.SalesRepresentativeCreateManyAndReturnArgs> = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), data: z.union([ SalesRepresentativeCreateManyInputObjectSchema, z.array(SalesRepresentativeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeCreateManyAndReturnArgs>;

export const SalesRepresentativeCreateManyAndReturnZodSchema = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), data: z.union([ SalesRepresentativeCreateManyInputObjectSchema, z.array(SalesRepresentativeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();