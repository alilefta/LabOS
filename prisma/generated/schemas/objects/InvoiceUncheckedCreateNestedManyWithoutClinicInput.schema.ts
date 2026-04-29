import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCreateWithoutClinicInputObjectSchema as InvoiceCreateWithoutClinicInputObjectSchema } from './InvoiceCreateWithoutClinicInput.schema';
import { InvoiceUncheckedCreateWithoutClinicInputObjectSchema as InvoiceUncheckedCreateWithoutClinicInputObjectSchema } from './InvoiceUncheckedCreateWithoutClinicInput.schema';
import { InvoiceCreateOrConnectWithoutClinicInputObjectSchema as InvoiceCreateOrConnectWithoutClinicInputObjectSchema } from './InvoiceCreateOrConnectWithoutClinicInput.schema';
import { InvoiceCreateManyClinicInputEnvelopeObjectSchema as InvoiceCreateManyClinicInputEnvelopeObjectSchema } from './InvoiceCreateManyClinicInputEnvelope.schema';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCreateWithoutClinicInputObjectSchema), z.lazy(() => InvoiceCreateWithoutClinicInputObjectSchema).array(), z.lazy(() => InvoiceUncheckedCreateWithoutClinicInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutClinicInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoiceCreateOrConnectWithoutClinicInputObjectSchema), z.lazy(() => InvoiceCreateOrConnectWithoutClinicInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyClinicInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InvoiceWhereUniqueInputObjectSchema), z.lazy(() => InvoiceWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InvoiceUncheckedCreateNestedManyWithoutClinicInputObjectSchema: z.ZodType<Prisma.InvoiceUncheckedCreateNestedManyWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUncheckedCreateNestedManyWithoutClinicInput>;
export const InvoiceUncheckedCreateNestedManyWithoutClinicInputObjectZodSchema = makeSchema();
