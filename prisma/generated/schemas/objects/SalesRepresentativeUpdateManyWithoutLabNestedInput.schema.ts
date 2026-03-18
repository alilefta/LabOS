import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeCreateWithoutLabInputObjectSchema as SalesRepresentativeCreateWithoutLabInputObjectSchema } from './SalesRepresentativeCreateWithoutLabInput.schema';
import { SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema as SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema } from './SalesRepresentativeUncheckedCreateWithoutLabInput.schema';
import { SalesRepresentativeCreateOrConnectWithoutLabInputObjectSchema as SalesRepresentativeCreateOrConnectWithoutLabInputObjectSchema } from './SalesRepresentativeCreateOrConnectWithoutLabInput.schema';
import { SalesRepresentativeUpsertWithWhereUniqueWithoutLabInputObjectSchema as SalesRepresentativeUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './SalesRepresentativeUpsertWithWhereUniqueWithoutLabInput.schema';
import { SalesRepresentativeCreateManyLabInputEnvelopeObjectSchema as SalesRepresentativeCreateManyLabInputEnvelopeObjectSchema } from './SalesRepresentativeCreateManyLabInputEnvelope.schema';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './SalesRepresentativeWhereUniqueInput.schema';
import { SalesRepresentativeUpdateWithWhereUniqueWithoutLabInputObjectSchema as SalesRepresentativeUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './SalesRepresentativeUpdateWithWhereUniqueWithoutLabInput.schema';
import { SalesRepresentativeUpdateManyWithWhereWithoutLabInputObjectSchema as SalesRepresentativeUpdateManyWithWhereWithoutLabInputObjectSchema } from './SalesRepresentativeUpdateManyWithWhereWithoutLabInput.schema';
import { SalesRepresentativeScalarWhereInputObjectSchema as SalesRepresentativeScalarWhereInputObjectSchema } from './SalesRepresentativeScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SalesRepresentativeCreateWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeCreateWithoutLabInputObjectSchema).array(), z.lazy(() => SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SalesRepresentativeCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SalesRepresentativeUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => SalesRepresentativeCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema), z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema), z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema), z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema), z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => SalesRepresentativeUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SalesRepresentativeUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SalesRepresentativeScalarWhereInputObjectSchema), z.lazy(() => SalesRepresentativeScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const SalesRepresentativeUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeUpdateManyWithoutLabNestedInput>;
export const SalesRepresentativeUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
