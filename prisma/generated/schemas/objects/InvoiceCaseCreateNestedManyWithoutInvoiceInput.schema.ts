import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseCreateWithoutInvoiceInputObjectSchema as InvoiceCaseCreateWithoutInvoiceInputObjectSchema } from './InvoiceCaseCreateWithoutInvoiceInput.schema';
import { InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema as InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutInvoiceInput.schema';
import { InvoiceCaseCreateOrConnectWithoutInvoiceInputObjectSchema as InvoiceCaseCreateOrConnectWithoutInvoiceInputObjectSchema } from './InvoiceCaseCreateOrConnectWithoutInvoiceInput.schema';
import { InvoiceCaseCreateManyInvoiceInputEnvelopeObjectSchema as InvoiceCaseCreateManyInvoiceInputEnvelopeObjectSchema } from './InvoiceCaseCreateManyInvoiceInputEnvelope.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseCreateWithoutInvoiceInputObjectSchema).array(), z.lazy(() => InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoiceCaseCreateOrConnectWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseCreateOrConnectWithoutInvoiceInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoiceCaseCreateManyInvoiceInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema), z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InvoiceCaseCreateNestedManyWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoiceCaseCreateNestedManyWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseCreateNestedManyWithoutInvoiceInput>;
export const InvoiceCaseCreateNestedManyWithoutInvoiceInputObjectZodSchema = makeSchema();
