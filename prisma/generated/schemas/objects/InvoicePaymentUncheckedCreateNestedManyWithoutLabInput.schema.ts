import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentCreateWithoutLabInputObjectSchema as InvoicePaymentCreateWithoutLabInputObjectSchema } from './InvoicePaymentCreateWithoutLabInput.schema';
import { InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema as InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema } from './InvoicePaymentUncheckedCreateWithoutLabInput.schema';
import { InvoicePaymentCreateOrConnectWithoutLabInputObjectSchema as InvoicePaymentCreateOrConnectWithoutLabInputObjectSchema } from './InvoicePaymentCreateOrConnectWithoutLabInput.schema';
import { InvoicePaymentCreateManyLabInputEnvelopeObjectSchema as InvoicePaymentCreateManyLabInputEnvelopeObjectSchema } from './InvoicePaymentCreateManyLabInputEnvelope.schema';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './InvoicePaymentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoicePaymentCreateWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentCreateWithoutLabInputObjectSchema).array(), z.lazy(() => InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoicePaymentCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoicePaymentCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema), z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InvoicePaymentUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoicePaymentUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentUncheckedCreateNestedManyWithoutLabInput>;
export const InvoicePaymentUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
