import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseCreateWithoutLabInputObjectSchema as InvoiceCaseCreateWithoutLabInputObjectSchema } from './InvoiceCaseCreateWithoutLabInput.schema';
import { InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema as InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutLabInput.schema';
import { InvoiceCaseCreateOrConnectWithoutLabInputObjectSchema as InvoiceCaseCreateOrConnectWithoutLabInputObjectSchema } from './InvoiceCaseCreateOrConnectWithoutLabInput.schema';
import { InvoiceCaseCreateManyLabInputEnvelopeObjectSchema as InvoiceCaseCreateManyLabInputEnvelopeObjectSchema } from './InvoiceCaseCreateManyLabInputEnvelope.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseCreateWithoutLabInputObjectSchema).array(), z.lazy(() => InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoiceCaseCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoiceCaseCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema), z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InvoiceCaseUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUncheckedCreateNestedManyWithoutLabInput>;
export const InvoiceCaseUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
