import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentUpdateWithoutInvoiceInputObjectSchema as InvoicePaymentUpdateWithoutInvoiceInputObjectSchema } from './InvoicePaymentUpdateWithoutInvoiceInput.schema';
import { InvoicePaymentUncheckedUpdateWithoutInvoiceInputObjectSchema as InvoicePaymentUncheckedUpdateWithoutInvoiceInputObjectSchema } from './InvoicePaymentUncheckedUpdateWithoutInvoiceInput.schema';
import { InvoicePaymentCreateWithoutInvoiceInputObjectSchema as InvoicePaymentCreateWithoutInvoiceInputObjectSchema } from './InvoicePaymentCreateWithoutInvoiceInput.schema';
import { InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema as InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema } from './InvoicePaymentUncheckedCreateWithoutInvoiceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InvoicePaymentUpdateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedUpdateWithoutInvoiceInputObjectSchema)]),
  create: z.union([z.lazy(() => InvoicePaymentCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema)])
}).strict();
export const InvoicePaymentUpsertWithWhereUniqueWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoicePaymentUpsertWithWhereUniqueWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentUpsertWithWhereUniqueWithoutInvoiceInput>;
export const InvoicePaymentUpsertWithWhereUniqueWithoutInvoiceInputObjectZodSchema = makeSchema();
