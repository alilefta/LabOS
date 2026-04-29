import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCreateWithoutLabInputObjectSchema as InvoiceCreateWithoutLabInputObjectSchema } from './InvoiceCreateWithoutLabInput.schema';
import { InvoiceUncheckedCreateWithoutLabInputObjectSchema as InvoiceUncheckedCreateWithoutLabInputObjectSchema } from './InvoiceUncheckedCreateWithoutLabInput.schema';
import { InvoiceCreateOrConnectWithoutLabInputObjectSchema as InvoiceCreateOrConnectWithoutLabInputObjectSchema } from './InvoiceCreateOrConnectWithoutLabInput.schema';
import { InvoiceUpsertWithWhereUniqueWithoutLabInputObjectSchema as InvoiceUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './InvoiceUpsertWithWhereUniqueWithoutLabInput.schema';
import { InvoiceCreateManyLabInputEnvelopeObjectSchema as InvoiceCreateManyLabInputEnvelopeObjectSchema } from './InvoiceCreateManyLabInputEnvelope.schema';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema';
import { InvoiceUpdateWithWhereUniqueWithoutLabInputObjectSchema as InvoiceUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './InvoiceUpdateWithWhereUniqueWithoutLabInput.schema';
import { InvoiceUpdateManyWithWhereWithoutLabInputObjectSchema as InvoiceUpdateManyWithWhereWithoutLabInputObjectSchema } from './InvoiceUpdateManyWithWhereWithoutLabInput.schema';
import { InvoiceScalarWhereInputObjectSchema as InvoiceScalarWhereInputObjectSchema } from './InvoiceScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceCreateWithoutLabInputObjectSchema).array(), z.lazy(() => InvoiceUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoiceCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => InvoiceCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InvoiceWhereUniqueInputObjectSchema), z.lazy(() => InvoiceWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InvoiceWhereUniqueInputObjectSchema), z.lazy(() => InvoiceWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InvoiceWhereUniqueInputObjectSchema), z.lazy(() => InvoiceWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InvoiceWhereUniqueInputObjectSchema), z.lazy(() => InvoiceWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InvoiceUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => InvoiceUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InvoiceScalarWhereInputObjectSchema), z.lazy(() => InvoiceScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InvoiceUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.InvoiceUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpdateManyWithoutLabNestedInput>;
export const InvoiceUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
