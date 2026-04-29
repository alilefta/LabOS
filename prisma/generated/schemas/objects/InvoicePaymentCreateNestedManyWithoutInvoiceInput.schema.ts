import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentCreateWithoutInvoiceInputObjectSchema as InvoicePaymentCreateWithoutInvoiceInputObjectSchema } from './InvoicePaymentCreateWithoutInvoiceInput.schema';
import { InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema as InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema } from './InvoicePaymentUncheckedCreateWithoutInvoiceInput.schema';
import { InvoicePaymentCreateOrConnectWithoutInvoiceInputObjectSchema as InvoicePaymentCreateOrConnectWithoutInvoiceInputObjectSchema } from './InvoicePaymentCreateOrConnectWithoutInvoiceInput.schema';
import { InvoicePaymentCreateManyInvoiceInputEnvelopeObjectSchema as InvoicePaymentCreateManyInvoiceInputEnvelopeObjectSchema } from './InvoicePaymentCreateManyInvoiceInputEnvelope.schema';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './InvoicePaymentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoicePaymentCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentCreateWithoutInvoiceInputObjectSchema).array(), z.lazy(() => InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoicePaymentCreateOrConnectWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentCreateOrConnectWithoutInvoiceInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoicePaymentCreateManyInvoiceInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema), z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InvoicePaymentCreateNestedManyWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoicePaymentCreateNestedManyWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentCreateNestedManyWithoutInvoiceInput>;
export const InvoicePaymentCreateNestedManyWithoutInvoiceInputObjectZodSchema = makeSchema();
