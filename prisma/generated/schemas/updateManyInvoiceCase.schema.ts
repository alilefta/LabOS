import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseUpdateManyMutationInputObjectSchema as InvoiceCaseUpdateManyMutationInputObjectSchema } from './objects/InvoiceCaseUpdateManyMutationInput.schema';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './objects/InvoiceCaseWhereInput.schema';

export const InvoiceCaseUpdateManySchema: z.ZodType<Prisma.InvoiceCaseUpdateManyArgs> = z.object({ data: InvoiceCaseUpdateManyMutationInputObjectSchema, where: InvoiceCaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateManyArgs>;

export const InvoiceCaseUpdateManyZodSchema = z.object({ data: InvoiceCaseUpdateManyMutationInputObjectSchema, where: InvoiceCaseWhereInputObjectSchema.optional() }).strict();