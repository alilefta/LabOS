import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeCreateManyInputObjectSchema as SalesRepresentativeCreateManyInputObjectSchema } from './objects/SalesRepresentativeCreateManyInput.schema';

export const SalesRepresentativeCreateManySchema: z.ZodType<Prisma.SalesRepresentativeCreateManyArgs> = z.object({ data: z.union([ SalesRepresentativeCreateManyInputObjectSchema, z.array(SalesRepresentativeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeCreateManyArgs>;

export const SalesRepresentativeCreateManyZodSchema = z.object({ data: z.union([ SalesRepresentativeCreateManyInputObjectSchema, z.array(SalesRepresentativeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();