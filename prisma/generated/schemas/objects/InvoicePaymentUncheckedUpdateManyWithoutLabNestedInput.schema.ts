import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentCreateWithoutLabInputObjectSchema as InvoicePaymentCreateWithoutLabInputObjectSchema } from './InvoicePaymentCreateWithoutLabInput.schema';
import { InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema as InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema } from './InvoicePaymentUncheckedCreateWithoutLabInput.schema';
import { InvoicePaymentCreateOrConnectWithoutLabInputObjectSchema as InvoicePaymentCreateOrConnectWithoutLabInputObjectSchema } from './InvoicePaymentCreateOrConnectWithoutLabInput.schema';
import { InvoicePaymentUpsertWithWhereUniqueWithoutLabInputObjectSchema as InvoicePaymentUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './InvoicePaymentUpsertWithWhereUniqueWithoutLabInput.schema';
import { InvoicePaymentCreateManyLabInputEnvelopeObjectSchema as InvoicePaymentCreateManyLabInputEnvelopeObjectSchema } from './InvoicePaymentCreateManyLabInputEnvelope.schema';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentUpdateWithWhereUniqueWithoutLabInputObjectSchema as InvoicePaymentUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './InvoicePaymentUpdateWithWhereUniqueWithoutLabInput.schema';
import { InvoicePaymentUpdateManyWithWhereWithoutLabInputObjectSchema as InvoicePaymentUpdateManyWithWhereWithoutLabInputObjectSchema } from './InvoicePaymentUpdateManyWithWhereWithoutLabInput.schema';
import { InvoicePaymentScalarWhereInputObjectSchema as InvoicePaymentScalarWhereInputObjectSchema } from './InvoicePaymentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoicePaymentCreateWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentCreateWithoutLabInputObjectSchema).array(), z.lazy(() => InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoicePaymentCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InvoicePaymentUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoicePaymentCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema), z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema), z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema), z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema), z.lazy(() => InvoicePaymentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InvoicePaymentUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InvoicePaymentUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => InvoicePaymentUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema), z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InvoicePaymentUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.InvoicePaymentUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentUncheckedUpdateManyWithoutLabNestedInput>;
export const InvoicePaymentUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
