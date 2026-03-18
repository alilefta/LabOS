import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeUpdateWithoutCasesInputObjectSchema as SalesRepresentativeUpdateWithoutCasesInputObjectSchema } from './SalesRepresentativeUpdateWithoutCasesInput.schema';
import { SalesRepresentativeUncheckedUpdateWithoutCasesInputObjectSchema as SalesRepresentativeUncheckedUpdateWithoutCasesInputObjectSchema } from './SalesRepresentativeUncheckedUpdateWithoutCasesInput.schema';
import { SalesRepresentativeCreateWithoutCasesInputObjectSchema as SalesRepresentativeCreateWithoutCasesInputObjectSchema } from './SalesRepresentativeCreateWithoutCasesInput.schema';
import { SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema as SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema } from './SalesRepresentativeUncheckedCreateWithoutCasesInput.schema';
import { SalesRepresentativeWhereInputObjectSchema as SalesRepresentativeWhereInputObjectSchema } from './SalesRepresentativeWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => SalesRepresentativeUpdateWithoutCasesInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => SalesRepresentativeCreateWithoutCasesInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema)]),
  where: z.lazy(() => SalesRepresentativeWhereInputObjectSchema).optional()
}).strict();
export const SalesRepresentativeUpsertWithoutCasesInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeUpsertWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeUpsertWithoutCasesInput>;
export const SalesRepresentativeUpsertWithoutCasesInputObjectZodSchema = makeSchema();
