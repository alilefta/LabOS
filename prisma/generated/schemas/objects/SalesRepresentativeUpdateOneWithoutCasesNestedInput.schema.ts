import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeCreateWithoutCasesInputObjectSchema as SalesRepresentativeCreateWithoutCasesInputObjectSchema } from './SalesRepresentativeCreateWithoutCasesInput.schema';
import { SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema as SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema } from './SalesRepresentativeUncheckedCreateWithoutCasesInput.schema';
import { SalesRepresentativeCreateOrConnectWithoutCasesInputObjectSchema as SalesRepresentativeCreateOrConnectWithoutCasesInputObjectSchema } from './SalesRepresentativeCreateOrConnectWithoutCasesInput.schema';
import { SalesRepresentativeUpsertWithoutCasesInputObjectSchema as SalesRepresentativeUpsertWithoutCasesInputObjectSchema } from './SalesRepresentativeUpsertWithoutCasesInput.schema';
import { SalesRepresentativeWhereInputObjectSchema as SalesRepresentativeWhereInputObjectSchema } from './SalesRepresentativeWhereInput.schema';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './SalesRepresentativeWhereUniqueInput.schema';
import { SalesRepresentativeUpdateToOneWithWhereWithoutCasesInputObjectSchema as SalesRepresentativeUpdateToOneWithWhereWithoutCasesInputObjectSchema } from './SalesRepresentativeUpdateToOneWithWhereWithoutCasesInput.schema';
import { SalesRepresentativeUpdateWithoutCasesInputObjectSchema as SalesRepresentativeUpdateWithoutCasesInputObjectSchema } from './SalesRepresentativeUpdateWithoutCasesInput.schema';
import { SalesRepresentativeUncheckedUpdateWithoutCasesInputObjectSchema as SalesRepresentativeUncheckedUpdateWithoutCasesInputObjectSchema } from './SalesRepresentativeUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SalesRepresentativeCreateWithoutCasesInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => SalesRepresentativeCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  upsert: z.lazy(() => SalesRepresentativeUpsertWithoutCasesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => SalesRepresentativeWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => SalesRepresentativeWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => SalesRepresentativeWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => SalesRepresentativeUpdateToOneWithWhereWithoutCasesInputObjectSchema), z.lazy(() => SalesRepresentativeUpdateWithoutCasesInputObjectSchema), z.lazy(() => SalesRepresentativeUncheckedUpdateWithoutCasesInputObjectSchema)]).optional()
}).strict();
export const SalesRepresentativeUpdateOneWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeUpdateOneWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeUpdateOneWithoutCasesNestedInput>;
export const SalesRepresentativeUpdateOneWithoutCasesNestedInputObjectZodSchema = makeSchema();
