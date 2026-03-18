import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './SalesRepresentativeWhereUniqueInput.schema';
import { SalesRepresentativeCreateWithoutLabInputObjectSchema as SalesRepresentativeCreateWithoutLabInputObjectSchema } from './SalesRepresentativeCreateWithoutLabInput.schema';
import { SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema as SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema } from './SalesRepresentativeUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => SalesRepresentativeCreateWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const SalesRepresentativeCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeCreateOrConnectWithoutLabInput>;
export const SalesRepresentativeCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
