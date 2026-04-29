import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicCreateWithoutInvoicesInputObjectSchema as ClinicCreateWithoutInvoicesInputObjectSchema } from './ClinicCreateWithoutInvoicesInput.schema';
import { ClinicUncheckedCreateWithoutInvoicesInputObjectSchema as ClinicUncheckedCreateWithoutInvoicesInputObjectSchema } from './ClinicUncheckedCreateWithoutInvoicesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ClinicCreateWithoutInvoicesInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutInvoicesInputObjectSchema)])
}).strict();
export const ClinicCreateOrConnectWithoutInvoicesInputObjectSchema: z.ZodType<Prisma.ClinicCreateOrConnectWithoutInvoicesInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateOrConnectWithoutInvoicesInput>;
export const ClinicCreateOrConnectWithoutInvoicesInputObjectZodSchema = makeSchema();
