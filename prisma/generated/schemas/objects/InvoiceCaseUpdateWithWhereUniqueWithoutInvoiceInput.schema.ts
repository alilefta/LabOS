import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseUpdateWithoutInvoiceInputObjectSchema as InvoiceCaseUpdateWithoutInvoiceInputObjectSchema } from './InvoiceCaseUpdateWithoutInvoiceInput.schema';
import { InvoiceCaseUncheckedUpdateWithoutInvoiceInputObjectSchema as InvoiceCaseUncheckedUpdateWithoutInvoiceInputObjectSchema } from './InvoiceCaseUncheckedUpdateWithoutInvoiceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InvoiceCaseUpdateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedUpdateWithoutInvoiceInputObjectSchema)])
}).strict();
export const InvoiceCaseUpdateWithWhereUniqueWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpdateWithWhereUniqueWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateWithWhereUniqueWithoutInvoiceInput>;
export const InvoiceCaseUpdateWithWhereUniqueWithoutInvoiceInputObjectZodSchema = makeSchema();
