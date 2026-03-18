import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './SalesRepresentativeWhereUniqueInput.schema';
import { SalesRepresentativeCreateWithoutCasesInputObjectSchema as SalesRepresentativeCreateWithoutCasesInputObjectSchema } from './SalesRepresentativeCreateWithoutCasesInput.schema';
import { SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema as SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema } from './SalesRepresentativeUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => SalesRepresentativeCreateWithoutCasesInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const SalesRepresentativeCreateOrConnectWithoutCasesInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeCreateOrConnectWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeCreateOrConnectWithoutCasesInput>;
export const SalesRepresentativeCreateOrConnectWithoutCasesInputObjectZodSchema = makeSchema();
