import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeCreateWithoutLabInputObjectSchema as SalesRepresentativeCreateWithoutLabInputObjectSchema } from './SalesRepresentativeCreateWithoutLabInput.schema';
import { SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema as SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema } from './SalesRepresentativeUncheckedCreateWithoutLabInput.schema';
import { SalesRepresentativeCreateOrConnectWithoutLabInputObjectSchema as SalesRepresentativeCreateOrConnectWithoutLabInputObjectSchema } from './SalesRepresentativeCreateOrConnectWithoutLabInput.schema';
import { SalesRepresentativeCreateManyLabInputEnvelopeObjectSchema as SalesRepresentativeCreateManyLabInputEnvelopeObjectSchema } from './SalesRepresentativeCreateManyLabInputEnvelope.schema';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './SalesRepresentativeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SalesRepresentativeCreateWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeCreateWithoutLabInputObjectSchema).array(), z.lazy(() => SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SalesRepresentativeCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => SalesRepresentativeCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema), z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const SalesRepresentativeUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeUncheckedCreateNestedManyWithoutLabInput>;
export const SalesRepresentativeUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
