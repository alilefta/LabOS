import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCreateWithoutLabInputObjectSchema as InvoiceCreateWithoutLabInputObjectSchema } from './InvoiceCreateWithoutLabInput.schema';
import { InvoiceUncheckedCreateWithoutLabInputObjectSchema as InvoiceUncheckedCreateWithoutLabInputObjectSchema } from './InvoiceUncheckedCreateWithoutLabInput.schema';
import { InvoiceCreateOrConnectWithoutLabInputObjectSchema as InvoiceCreateOrConnectWithoutLabInputObjectSchema } from './InvoiceCreateOrConnectWithoutLabInput.schema';
import { InvoiceCreateManyLabInputEnvelopeObjectSchema as InvoiceCreateManyLabInputEnvelopeObjectSchema } from './InvoiceCreateManyLabInputEnvelope.schema';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceCreateWithoutLabInputObjectSchema).array(), z.lazy(() => InvoiceUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoiceCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => InvoiceCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InvoiceWhereUniqueInputObjectSchema), z.lazy(() => InvoiceWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InvoiceCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCreateNestedManyWithoutLabInput>;
export const InvoiceCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
