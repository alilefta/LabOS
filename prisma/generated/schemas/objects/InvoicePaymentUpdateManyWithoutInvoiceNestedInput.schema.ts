import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentCreateWithoutInvoiceInputObjectSchema as InvoicePaymentCreateWithoutInvoiceInputObjectSchema } from './InvoicePaymentCreateWithoutInvoiceInput.schema';
import { InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema as InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema } from './InvoicePaymentUncheckedCreateWithoutInvoiceInput.schema';
import { InvoicePaymentCreateOrConnectWithoutInvoiceInputObjectSchema as InvoicePaymentCreateOrConnectWithoutInvoiceInputObjectSchema } from './InvoicePaymentCreateOrConnectWithoutInvoiceInput.schema';
import { InvoicePaymentUpsertWithWhereUniqueWithoutInvoiceInputObjectSchema as InvoicePaymentUpsertWithWhereUniqueWithoutInvoiceInputObjectSchema } from './InvoicePaymentUpsertWithWhereUniqueWithoutInvoiceInput.schema';
import { InvoicePaymentCreateManyInvoiceInputEnvelopeObjectSchema as InvoicePaymentCreateManyInvoiceInputEnvelopeObjectSchema } from './InvoicePaymentCreateManyInvoiceInputEnvelope.schema';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentUpdateWithWhereUniqueWithoutInvoiceInputObjectSchema as InvoicePaymentUpdateWithWhereUniqueWithoutInvoiceInputObjectSchema } from './InvoicePaymentUpdateWithWhereUniqueWithoutInvoiceInput.schema';
import { InvoicePaymentUpdateManyWithWhereWithoutInvoiceInputObjectSchema as InvoicePaymentUpdateManyWithWhereWithoutInvoiceInputObjectSchema } from './InvoicePaymentUpdateManyWithWhereWithoutInvoiceInput.schema';
import { InvoicePaymentScalarWhereInputObjectSchema as InvoicePaymentScalarWhereInputObjectSchema } from './InvoicePaymentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoicePaymentCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentCreateWithoutInvoiceInputObjectSchema).array(), z.lazy(() => InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedCreateWithoutInvoiceInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoicePaymentCreateOrConnectWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentCreateOrConnectWithoutInvoiceInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InvoicePaymentUpsertWithWhereUniqueWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentUpsertWithWhereUniqueWithoutInvoiceInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoicePaymentCreateManyInvoiceInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema), z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema), z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema), z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema), z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InvoicePaymentUpdateWithWhereUniqueWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentUpdateWithWhereUniqueWithoutInvoiceInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InvoicePaymentUpdateManyWithWhereWithoutInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentUpdateManyWithWhereWithoutInvoiceInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema), z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InvoicePaymentUpdateManyWithoutInvoiceNestedInputObjectSchema: z.ZodType<Prisma.InvoicePaymentUpdateManyWithoutInvoiceNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentUpdateManyWithoutInvoiceNestedInput>;
export const InvoicePaymentUpdateManyWithoutInvoiceNestedInputObjectZodSchema = makeSchema();
