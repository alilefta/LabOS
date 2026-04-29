import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentCreateWithoutInvoiceInputObjectSchema as InvoicePaymentCreateWithoutInvoiceInputObjectSchema } from './InvoicePaymentCreateWithoutInvoiceInput.schema';
import { InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema as InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema } from './InvoicePaymentUncheckedCreateWithoutInvoiceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvoicePaymentCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema)])
}).strict();
export const InvoicePaymentCreateOrConnectWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoicePaymentCreateOrConnectWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentCreateOrConnectWithoutInvoiceInput>;
export const InvoicePaymentCreateOrConnectWithoutInvoiceInputObjectZodSchema = makeSchema();
