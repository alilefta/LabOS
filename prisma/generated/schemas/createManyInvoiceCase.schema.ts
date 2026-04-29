import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseCreateManyInputObjectSchema as InvoiceCaseCreateManyInputObjectSchema } from './objects/InvoiceCaseCreateManyInput.schema';

export const InvoiceCaseCreateManySchema: z.ZodType<Prisma.InvoiceCaseCreateManyArgs> = z.object({ data: z.union([ InvoiceCaseCreateManyInputObjectSchema, z.array(InvoiceCaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseCreateManyArgs>;

export const InvoiceCaseCreateManyZodSchema = z.object({ data: z.union([ InvoiceCaseCreateManyInputObjectSchema, z.array(InvoiceCaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();