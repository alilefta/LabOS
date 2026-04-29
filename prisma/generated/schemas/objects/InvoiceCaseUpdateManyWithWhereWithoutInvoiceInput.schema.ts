import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseScalarWhereInputObjectSchema as InvoiceCaseScalarWhereInputObjectSchema } from './InvoiceCaseScalarWhereInput.schema';
import { InvoiceCaseUpdateManyMutationInputObjectSchema as InvoiceCaseUpdateManyMutationInputObjectSchema } from './InvoiceCaseUpdateManyMutationInput.schema';
import { InvoiceCaseUncheckedUpdateManyWithoutInvoiceInputObjectSchema as InvoiceCaseUncheckedUpdateManyWithoutInvoiceInputObjectSchema } from './InvoiceCaseUncheckedUpdateManyWithoutInvoiceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InvoiceCaseUpdateManyMutationInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedUpdateManyWithoutInvoiceInputObjectSchema)])
}).strict();
export const InvoiceCaseUpdateManyWithWhereWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpdateManyWithWhereWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateManyWithWhereWithoutInvoiceInput>;
export const InvoiceCaseUpdateManyWithWhereWithoutInvoiceInputObjectZodSchema = makeSchema();
