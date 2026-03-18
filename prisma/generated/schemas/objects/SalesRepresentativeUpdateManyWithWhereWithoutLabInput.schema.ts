import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeScalarWhereInputObjectSchema as SalesRepresentativeScalarWhereInputObjectSchema } from './SalesRepresentativeScalarWhereInput.schema';
import { SalesRepresentativeUpdateManyMutationInputObjectSchema as SalesRepresentativeUpdateManyMutationInputObjectSchema } from './SalesRepresentativeUpdateManyMutationInput.schema';
import { SalesRepresentativeUncheckedUpdateManyWithoutLabInputObjectSchema as SalesRepresentativeUncheckedUpdateManyWithoutLabInputObjectSchema } from './SalesRepresentativeUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SalesRepresentativeScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => SalesRepresentativeUpdateManyMutationInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const SalesRepresentativeUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeUpdateManyWithWhereWithoutLabInput>;
export const SalesRepresentativeUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
