import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentScalarWhereInputObjectSchema as InvoicePaymentScalarWhereInputObjectSchema } from './InvoicePaymentScalarWhereInput.schema';
import { InvoicePaymentUpdateManyMutationInputObjectSchema as InvoicePaymentUpdateManyMutationInputObjectSchema } from './InvoicePaymentUpdateManyMutationInput.schema';
import { InvoicePaymentUncheckedUpdateManyWithoutInvoiceInputObjectSchema as InvoicePaymentUncheckedUpdateManyWithoutInvoiceInputObjectSchema } from './InvoicePaymentUncheckedUpdateManyWithoutInvoiceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InvoicePaymentUpdateManyMutationInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedUpdateManyWithoutInvoiceInputObjectSchema)])
}).strict();
export const InvoicePaymentUpdateManyWithWhereWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoicePaymentUpdateManyWithWhereWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentUpdateManyWithWhereWithoutInvoiceInput>;
export const InvoicePaymentUpdateManyWithWhereWithoutInvoiceInputObjectZodSchema = makeSchema();
