import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeWhereInputObjectSchema as SalesRepresentativeWhereInputObjectSchema } from './SalesRepresentativeWhereInput.schema';
import { SalesRepresentativeUpdateWithoutCasesInputObjectSchema as SalesRepresentativeUpdateWithoutCasesInputObjectSchema } from './SalesRepresentativeUpdateWithoutCasesInput.schema';
import { SalesRepresentativeUncheckedUpdateWithoutCasesInputObjectSchema as SalesRepresentativeUncheckedUpdateWithoutCasesInputObjectSchema } from './SalesRepresentativeUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SalesRepresentativeWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => SalesRepresentativeUpdateWithoutCasesInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const SalesRepresentativeUpdateToOneWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeUpdateToOneWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeUpdateToOneWithWhereWithoutCasesInput>;
export const SalesRepresentativeUpdateToOneWithWhereWithoutCasesInputObjectZodSchema = makeSchema();
