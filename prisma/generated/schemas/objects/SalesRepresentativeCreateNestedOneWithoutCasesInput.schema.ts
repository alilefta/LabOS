import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeCreateWithoutCasesInputObjectSchema as SalesRepresentativeCreateWithoutCasesInputObjectSchema } from './SalesRepresentativeCreateWithoutCasesInput.schema';
import { SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema as SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema } from './SalesRepresentativeUncheckedCreateWithoutCasesInput.schema';
import { SalesRepresentativeCreateOrConnectWithoutCasesInputObjectSchema as SalesRepresentativeCreateOrConnectWithoutCasesInputObjectSchema } from './SalesRepresentativeCreateOrConnectWithoutCasesInput.schema';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './SalesRepresentativeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SalesRepresentativeCreateWithoutCasesInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => SalesRepresentativeCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema).optional()
}).strict();
export const SalesRepresentativeCreateNestedOneWithoutCasesInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeCreateNestedOneWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeCreateNestedOneWithoutCasesInput>;
export const SalesRepresentativeCreateNestedOneWithoutCasesInputObjectZodSchema = makeSchema();
