import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseSelectObjectSchema as InvoiceCaseSelectObjectSchema } from './objects/InvoiceCaseSelect.schema';
import { InvoiceCaseUpdateManyMutationInputObjectSchema as InvoiceCaseUpdateManyMutationInputObjectSchema } from './objects/InvoiceCaseUpdateManyMutationInput.schema';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './objects/InvoiceCaseWhereInput.schema';

export const InvoiceCaseUpdateManyAndReturnSchema: z.ZodType<Prisma.InvoiceCaseUpdateManyAndReturnArgs> = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), data: InvoiceCaseUpdateManyMutationInputObjectSchema, where: InvoiceCaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateManyAndReturnArgs>;

export const InvoiceCaseUpdateManyAndReturnZodSchema = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), data: InvoiceCaseUpdateManyMutationInputObjectSchema, where: InvoiceCaseWhereInputObjectSchema.optional() }).strict();