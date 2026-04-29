import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseSelectObjectSchema as InvoiceCaseSelectObjectSchema } from './objects/InvoiceCaseSelect.schema';
import { InvoiceCaseIncludeObjectSchema as InvoiceCaseIncludeObjectSchema } from './objects/InvoiceCaseInclude.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './objects/InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseCreateInputObjectSchema as InvoiceCaseCreateInputObjectSchema } from './objects/InvoiceCaseCreateInput.schema';
import { InvoiceCaseUncheckedCreateInputObjectSchema as InvoiceCaseUncheckedCreateInputObjectSchema } from './objects/InvoiceCaseUncheckedCreateInput.schema';
import { InvoiceCaseUpdateInputObjectSchema as InvoiceCaseUpdateInputObjectSchema } from './objects/InvoiceCaseUpdateInput.schema';
import { InvoiceCaseUncheckedUpdateInputObjectSchema as InvoiceCaseUncheckedUpdateInputObjectSchema } from './objects/InvoiceCaseUncheckedUpdateInput.schema';

export const InvoiceCaseUpsertOneSchema: z.ZodType<Prisma.InvoiceCaseUpsertArgs> = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), include: InvoiceCaseIncludeObjectSchema.optional(), where: InvoiceCaseWhereUniqueInputObjectSchema, create: z.union([ InvoiceCaseCreateInputObjectSchema, InvoiceCaseUncheckedCreateInputObjectSchema ]), update: z.union([ InvoiceCaseUpdateInputObjectSchema, InvoiceCaseUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseUpsertArgs>;

export const InvoiceCaseUpsertOneZodSchema = z.object({ select: InvoiceCaseSelectObjectSchema.optional(), include: InvoiceCaseIncludeObjectSchema.optional(), where: InvoiceCaseWhereUniqueInputObjectSchema, create: z.union([ InvoiceCaseCreateInputObjectSchema, InvoiceCaseUncheckedCreateInputObjectSchema ]), update: z.union([ InvoiceCaseUpdateInputObjectSchema, InvoiceCaseUncheckedUpdateInputObjectSchema ]) }).strict();