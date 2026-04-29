import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentCreateWithoutLabInputObjectSchema as InvoicePaymentCreateWithoutLabInputObjectSchema } from './InvoicePaymentCreateWithoutLabInput.schema';
import { InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema as InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema } from './InvoicePaymentUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvoicePaymentCreateWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const InvoicePaymentCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoicePaymentCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentCreateOrConnectWithoutLabInput>;
export const InvoicePaymentCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
