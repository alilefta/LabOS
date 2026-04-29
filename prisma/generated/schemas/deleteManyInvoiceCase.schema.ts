import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './objects/InvoiceCaseWhereInput.schema';

export const InvoiceCaseDeleteManySchema: z.ZodType<Prisma.InvoiceCaseDeleteManyArgs> = z.object({ where: InvoiceCaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseDeleteManyArgs>;

export const InvoiceCaseDeleteManyZodSchema = z.object({ where: InvoiceCaseWhereInputObjectSchema.optional() }).strict();