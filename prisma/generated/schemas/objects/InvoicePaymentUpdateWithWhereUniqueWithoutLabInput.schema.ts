import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentUpdateWithoutLabInputObjectSchema as InvoicePaymentUpdateWithoutLabInputObjectSchema } from './InvoicePaymentUpdateWithoutLabInput.schema';
import { InvoicePaymentUncheckedUpdateWithoutLabInputObjectSchema as InvoicePaymentUncheckedUpdateWithoutLabInputObjectSchema } from './InvoicePaymentUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InvoicePaymentUpdateWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const InvoicePaymentUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoicePaymentUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentUpdateWithWhereUniqueWithoutLabInput>;
export const InvoicePaymentUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
