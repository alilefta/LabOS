import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentScalarWhereInputObjectSchema as InvoicePaymentScalarWhereInputObjectSchema } from './InvoicePaymentScalarWhereInput.schema';
import { InvoicePaymentUpdateManyMutationInputObjectSchema as InvoicePaymentUpdateManyMutationInputObjectSchema } from './InvoicePaymentUpdateManyMutationInput.schema';
import { InvoicePaymentUncheckedUpdateManyWithoutLabInputObjectSchema as InvoicePaymentUncheckedUpdateManyWithoutLabInputObjectSchema } from './InvoicePaymentUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InvoicePaymentUpdateManyMutationInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const InvoicePaymentUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoicePaymentUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentUpdateManyWithWhereWithoutLabInput>;
export const InvoicePaymentUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
