import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseCreateWithoutLabInputObjectSchema as InvoiceCaseCreateWithoutLabInputObjectSchema } from './InvoiceCaseCreateWithoutLabInput.schema';
import { InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema as InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutLabInput.schema';
import { InvoiceCaseCreateOrConnectWithoutLabInputObjectSchema as InvoiceCaseCreateOrConnectWithoutLabInputObjectSchema } from './InvoiceCaseCreateOrConnectWithoutLabInput.schema';
import { InvoiceCaseUpsertWithWhereUniqueWithoutLabInputObjectSchema as InvoiceCaseUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './InvoiceCaseUpsertWithWhereUniqueWithoutLabInput.schema';
import { InvoiceCaseCreateManyLabInputEnvelopeObjectSchema as InvoiceCaseCreateManyLabInputEnvelopeObjectSchema } from './InvoiceCaseCreateManyLabInputEnvelope.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseUpdateWithWhereUniqueWithoutLabInputObjectSchema as InvoiceCaseUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './InvoiceCaseUpdateWithWhereUniqueWithoutLabInput.schema';
import { InvoiceCaseUpdateManyWithWhereWithoutLabInputObjectSchema as InvoiceCaseUpdateManyWithWhereWithoutLabInputObjectSchema } from './InvoiceCaseUpdateManyWithWhereWithoutLabInput.schema';
import { InvoiceCaseScalarWhereInputObjectSchema as InvoiceCaseScalarWhereInputObjectSchema } from './InvoiceCaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseCreateWithoutLabInputObjectSchema).array(), z.lazy(() => InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvoiceCaseCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InvoiceCaseUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvoiceCaseCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema), z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema), z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema), z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema), z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InvoiceCaseUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InvoiceCaseUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema), z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InvoiceCaseUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateManyWithoutLabNestedInput>;
export const InvoiceCaseUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
