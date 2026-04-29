import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseUpdateWithoutInvoiceInputObjectSchema as InvoiceCaseUpdateWithoutInvoiceInputObjectSchema } from './InvoiceCaseUpdateWithoutInvoiceInput.schema';
import { InvoiceCaseUncheckedUpdateWithoutInvoiceInputObjectSchema as InvoiceCaseUncheckedUpdateWithoutInvoiceInputObjectSchema } from './InvoiceCaseUncheckedUpdateWithoutInvoiceInput.schema';
import { InvoiceCaseCreateWithoutInvoiceInputObjectSchema as InvoiceCaseCreateWithoutInvoiceInputObjectSchema } from './InvoiceCaseCreateWithoutInvoiceInput.schema';
import { InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema as InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutInvoiceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InvoiceCaseUpdateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedUpdateWithoutInvoiceInputObjectSchema)]),
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema)])
}).strict();
export const InvoiceCaseUpsertWithWhereUniqueWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpsertWithWhereUniqueWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpsertWithWhereUniqueWithoutInvoiceInput>;
export const InvoiceCaseUpsertWithWhereUniqueWithoutInvoiceInputObjectZodSchema = makeSchema();
