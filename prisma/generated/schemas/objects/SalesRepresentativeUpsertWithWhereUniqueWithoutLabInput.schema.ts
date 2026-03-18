import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './SalesRepresentativeWhereUniqueInput.schema';
import { SalesRepresentativeUpdateWithoutLabInputObjectSchema as SalesRepresentativeUpdateWithoutLabInputObjectSchema } from './SalesRepresentativeUpdateWithoutLabInput.schema';
import { SalesRepresentativeUncheckedUpdateWithoutLabInputObjectSchema as SalesRepresentativeUncheckedUpdateWithoutLabInputObjectSchema } from './SalesRepresentativeUncheckedUpdateWithoutLabInput.schema';
import { SalesRepresentativeCreateWithoutLabInputObjectSchema as SalesRepresentativeCreateWithoutLabInputObjectSchema } from './SalesRepresentativeCreateWithoutLabInput.schema';
import { SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema as SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema } from './SalesRepresentativeUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => SalesRepresentativeUpdateWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => SalesRepresentativeCreateWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const SalesRepresentativeUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeUpsertWithWhereUniqueWithoutLabInput>;
export const SalesRepresentativeUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
