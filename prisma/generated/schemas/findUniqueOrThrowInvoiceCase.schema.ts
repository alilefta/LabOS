import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseSelectObjectSchema as InvoiceCaseSelectObjectSchema } from './objects/InvoiceCaseSelect.schema';
import { InvoiceCaseIncludeObjectSchema as InvoiceCaseIncludeObjectSchema } from './objects/InvoiceCaseInclude.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './objects/InvoiceCaseWhereUniqueInput.schema';

export const InvoiceCaseFindUniqueOrThrowSchema: z.ZodType<Prisma.InvoiceCaseFindUniqueOrThrowArgs> = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), include: InvoiceCaseIncludeObjectSchema.optional(), where: InvoiceCaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseFindUniqueOrThrowArgs>;

export const InvoiceCaseFindUniqueOrThrowZodSchema = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), include: InvoiceCaseIncludeObjectSchema.optional(), where: InvoiceCaseWhereUniqueInputObjectSchema }).strict();