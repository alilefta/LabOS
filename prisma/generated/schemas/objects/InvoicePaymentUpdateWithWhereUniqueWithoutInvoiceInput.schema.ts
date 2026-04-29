import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentUpdateWithoutInvoiceInputObjectSchema as InvoicePaymentUpdateWithoutInvoiceInputObjectSchema } from './InvoicePaymentUpdateWithoutInvoiceInput.schema';
import { InvoicePaymentUncheckedUpdateWithoutInvoiceInputObjectSchema as InvoicePaymentUncheckedUpdateWithoutInvoiceInputObjectSchema } from './InvoicePaymentUncheckedUpdateWithoutInvoiceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InvoicePaymentUpdateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedUpdateWithoutInvoiceInputObjectSchema)])
}).strict();
export const InvoicePaymentUpdateWithWhereUniqueWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoicePaymentUpdateWithWhereUniqueWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentUpdateWithWhereUniqueWithoutInvoiceInput>;
export const InvoicePaymentUpdateWithWhereUniqueWithoutInvoiceInputObjectZodSchema = makeSchema();
