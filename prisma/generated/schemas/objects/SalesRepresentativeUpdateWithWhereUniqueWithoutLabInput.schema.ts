import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './SalesRepresentativeWhereUniqueInput.schema';
import { SalesRepresentativeUpdateWithoutLabInputObjectSchema as SalesRepresentativeUpdateWithoutLabInputObjectSchema } from './SalesRepresentativeUpdateWithoutLabInput.schema';
import { SalesRepresentativeUncheckedUpdateWithoutLabInputObjectSchema as SalesRepresentativeUncheckedUpdateWithoutLabInputObjectSchema } from './SalesRepresentativeUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => SalesRepresentativeUpdateWithoutLabInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const SalesRepresentativeUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeUpdateWithWhereUniqueWithoutLabInput>;
export const SalesRepresentativeUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
