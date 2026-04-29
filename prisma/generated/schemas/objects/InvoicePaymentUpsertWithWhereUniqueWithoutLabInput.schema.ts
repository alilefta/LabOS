import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentUpdateWithoutLabInputObjectSchema as InvoicePaymentUpdateWithoutLabInputObjectSchema } from './InvoicePaymentUpdateWithoutLabInput.schema';
import { InvoicePaymentUncheckedUpdateWithoutLabInputObjectSchema as InvoicePaymentUncheckedUpdateWithoutLabInputObjectSchema } from './InvoicePaymentUncheckedUpdateWithoutLabInput.schema';
import { InvoicePaymentCreateWithoutLabInputObjectSchema as InvoicePaymentCreateWithoutLabInputObjectSchema } from './InvoicePaymentCreateWithoutLabInput.schema';
import { InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema as InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema } from './InvoicePaymentUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InvoicePaymentUpdateWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => InvoicePaymentCreateWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const InvoicePaymentUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoicePaymentUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentUpsertWithWhereUniqueWithoutLabInput>;
export const InvoicePaymentUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
