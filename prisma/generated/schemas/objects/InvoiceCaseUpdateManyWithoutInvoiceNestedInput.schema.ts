import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseCreateWithoutInvoiceInputObjectSchema as InvoiceCaseCreateWithoutInvoiceInputObjectSchema } from './InvoiceCaseCreateWithoutInvoiceInput.schema';
import { InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema as InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutInvoiceInput.schema';
import { InvoiceCaseCreateOrConnectWithoutInvoiceInputObjectSchema as InvoiceCaseCreateOrConnectWithoutInvoiceInputObjectSchema } from './InvoiceCaseCreateOrConnectWithoutInvoiceInput.schema';
import { InvoiceCaseUpsertWithWhereUniqueWithoutInvoiceInputObjectSchema as InvoiceCaseUpsertWithWhereUniqueWithoutInvoiceInputObjectSchema } from './InvoiceCaseUpsertWithWhereUniqueWithoutInvoiceInput.schema';
import { InvoiceCaseCreateManyInvoiceInputEnvelopeObjectSchema as InvoiceCaseCreateManyInvoiceInputEnvelopeObjectSchema } from './InvoiceCaseCreateManyInvoiceInputEnvelope.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseUpdateWithWhereUniqueWithoutInvoiceInputObjectSchema as InvoiceCaseUpdateWithWhereUniqueWithoutInvoiceInputObjectSchema } from './InvoiceCaseUpdateWithWhereUniqueWithoutInvoiceInput.schema';
import { InvoiceCaseUpdateManyWithWhereWithoutInvoiceInputObjectSchema as InvoiceCaseUpdateManyWithWhereWithoutInvoiceInputObjectSchema } from './InvoiceCaseUpdateManyWithWhereWithoutInvoiceInput.schema';
import { InvoiceCaseScalarWhereInputObjectSchema as InvoiceCaseScalarWhereInputObjectSchema } from './InvoiceCaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseCreateWithoutInvoiceInputObjectSchema).array(), z.lazy(() => InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutInvoiceInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoiceCaseCreateOrConnectWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseCreateOrConnectWithoutInvoiceInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InvoiceCaseUpsertWithWhereUniqueWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseUpsertWithWhereUniqueWithoutInvoiceInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoiceCaseCreateManyInvoiceInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema), z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema), z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema), z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema), z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InvoiceCaseUpdateWithWhereUniqueWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseUpdateWithWhereUniqueWithoutInvoiceInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InvoiceCaseUpdateManyWithWhereWithoutInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseUpdateManyWithWhereWithoutInvoiceInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema), z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InvoiceCaseUpdateManyWithoutInvoiceNestedInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpdateManyWithoutInvoiceNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateManyWithoutInvoiceNestedInput>;
export const InvoiceCaseUpdateManyWithoutInvoiceNestedInputObjectZodSchema = makeSchema();
