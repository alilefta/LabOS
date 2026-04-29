import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseSelectObjectSchema as InvoiceCaseSelectObjectSchema } from './objects/InvoiceCaseSelect.schema';
import { InvoiceCaseIncludeObjectSchema as InvoiceCaseIncludeObjectSchema } from './objects/InvoiceCaseInclude.schema';
import { InvoiceCaseCreateInputObjectSchema as InvoiceCaseCreateInputObjectSchema } from './objects/InvoiceCaseCreateInput.schema';
import { InvoiceCaseUncheckedCreateInputObjectSchema as InvoiceCaseUncheckedCreateInputObjectSchema } from './objects/InvoiceCaseUncheckedCreateInput.schema';

export const InvoiceCaseCreateOneSchema: z.ZodType<Prisma.InvoiceCaseCreateArgs> = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), include: InvoiceCaseIncludeObjectSchema.optional(), data: z.union([InvoiceCaseCreateInputObjectSchema, InvoiceCaseUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseCreateArgs>;

export const InvoiceCaseCreateOneZodSchema = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), include: InvoiceCaseIncludeObjectSchema.optional(), data: z.union([InvoiceCaseCreateInputObjectSchema, InvoiceCaseUncheckedCreateInputObjectSchema]) }).strict();