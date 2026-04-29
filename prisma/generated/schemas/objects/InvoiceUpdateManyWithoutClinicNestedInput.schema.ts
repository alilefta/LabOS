import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCreateWithoutClinicInputObjectSchema as InvoiceCreateWithoutClinicInputObjectSchema } from './InvoiceCreateWithoutClinicInput.schema';
import { InvoiceUncheckedCreateWithoutClinicInputObjectSchema as InvoiceUncheckedCreateWithoutClinicInputObjectSchema } from './InvoiceUncheckedCreateWithoutClinicInput.schema';
import { InvoiceCreateOrConnectWithoutClinicInputObjectSchema as InvoiceCreateOrConnectWithoutClinicInputObjectSchema } from './InvoiceCreateOrConnectWithoutClinicInput.schema';
import { InvoiceUpsertWithWhereUniqueWithoutClinicInputObjectSchema as InvoiceUpsertWithWhereUniqueWithoutClinicInputObjectSchema } from './InvoiceUpsertWithWhereUniqueWithoutClinicInput.schema';
import { InvoiceCreateManyClinicInputEnvelopeObjectSchema as InvoiceCreateManyClinicInputEnvelopeObjectSchema } from './InvoiceCreateManyClinicInputEnvelope.schema';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema';
import { InvoiceUpdateWithWhereUniqueWithoutClinicInputObjectSchema as InvoiceUpdateWithWhereUniqueWithoutClinicInputObjectSchema } from './InvoiceUpdateWithWhereUniqueWithoutClinicInput.schema';
import { InvoiceUpdateManyWithWhereWithoutClinicInputObjectSchema as InvoiceUpdateManyWithWhereWithoutClinicInputObjectSchema } from './InvoiceUpdateManyWithWhereWithoutClinicInput.schema';
import { InvoiceScalarWhereInputObjectSchema as InvoiceScalarWhereInputObjectSchema } from './InvoiceScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCreateWithoutClinicInputObjectSchema), z.lazy(() => InvoiceCreateWithoutClinicInputObjectSchema).array(), z.lazy(() => InvoiceUncheckedCreateWithoutClinicInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutClinicInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoiceCreateOrConnectWithoutClinicInputObjectSchema), z.lazy(() => InvoiceCreateOrConnectWithoutClinicInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutClinicInputObjectSchema), z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutClinicInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyClinicInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InvoiceWhereUniqueInputObjectSchema), z.lazy(() => InvoiceWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InvoiceWhereUniqueInputObjectSchema), z.lazy(() => InvoiceWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InvoiceWhereUniqueInputObjectSchema), z.lazy(() => InvoiceWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InvoiceWhereUniqueInputObjectSchema), z.lazy(() => InvoiceWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutClinicInputObjectSchema), z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutClinicInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InvoiceUpdateManyWithWhereWithoutClinicInputObjectSchema), z.lazy(() => InvoiceUpdateManyWithWhereWithoutClinicInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InvoiceScalarWhereInputObjectSchema), z.lazy(() => InvoiceScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InvoiceUpdateManyWithoutClinicNestedInputObjectSchema: z.ZodType<Prisma.InvoiceUpdateManyWithoutClinicNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpdateManyWithoutClinicNestedInput>;
export const InvoiceUpdateManyWithoutClinicNestedInputObjectZodSchema = makeSchema();
