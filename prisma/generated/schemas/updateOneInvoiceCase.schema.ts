import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseSelectObjectSchema as InvoiceCaseSelectObjectSchema } from './objects/InvoiceCaseSelect.schema';
import { InvoiceCaseIncludeObjectSchema as InvoiceCaseIncludeObjectSchema } from './objects/InvoiceCaseInclude.schema';
import { InvoiceCaseUpdateInputObjectSchema as InvoiceCaseUpdateInputObjectSchema } from './objects/InvoiceCaseUpdateInput.schema';
import { InvoiceCaseUncheckedUpdateInputObjectSchema as InvoiceCaseUncheckedUpdateInputObjectSchema } from './objects/InvoiceCaseUncheckedUpdateInput.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './objects/InvoiceCaseWhereUniqueInput.schema';

export const InvoiceCaseUpdateOneSchema: z.ZodType<Prisma.InvoiceCaseUpdateArgs> = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), include: InvoiceCaseIncludeObjectSchema.optional(), data: z.union([InvoiceCaseUpdateInputObjectSchema, InvoiceCaseUncheckedUpdateInputObjectSchema]), where: InvoiceCaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateArgs>;

export const InvoiceCaseUpdateOneZodSchema = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), include: InvoiceCaseIncludeObjectSchema.optional(), data: z.union([InvoiceCaseUpdateInputObjectSchema, InvoiceCaseUncheckedUpdateInputObjectSchema]), where: InvoiceCaseWhereUniqueInputObjectSchema }).strict();