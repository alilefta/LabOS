import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseSelectObjectSchema as InvoiceCaseSelectObjectSchema } from './objects/InvoiceCaseSelect.schema';
import { InvoiceCaseCreateManyInputObjectSchema as InvoiceCaseCreateManyInputObjectSchema } from './objects/InvoiceCaseCreateManyInput.schema';

export const InvoiceCaseCreateManyAndReturnSchema: z.ZodType<Prisma.InvoiceCaseCreateManyAndReturnArgs> = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), data: z.union([ InvoiceCaseCreateManyInputObjectSchema, z.array(InvoiceCaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseCreateManyAndReturnArgs>;

export const InvoiceCaseCreateManyAndReturnZodSchema = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), data: z.union([ InvoiceCaseCreateManyInputObjectSchema, z.array(InvoiceCaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();