import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseCreateWithoutInvoiceInputObjectSchema as InvoiceCaseCreateWithoutInvoiceInputObjectSchema } from './InvoiceCaseCreateWithoutInvoiceInput.schema';
import { InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema as InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutInvoiceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema)])
}).strict();
export const InvoiceCaseCreateOrConnectWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoiceCaseCreateOrConnectWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseCreateOrConnectWithoutInvoiceInput>;
export const InvoiceCaseCreateOrConnectWithoutInvoiceInputObjectZodSchema = makeSchema();
