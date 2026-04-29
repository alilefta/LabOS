import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateWithoutInvoicesInputObjectSchema as ClinicCreateWithoutInvoicesInputObjectSchema } from './ClinicCreateWithoutInvoicesInput.schema';
import { ClinicUncheckedCreateWithoutInvoicesInputObjectSchema as ClinicUncheckedCreateWithoutInvoicesInputObjectSchema } from './ClinicUncheckedCreateWithoutInvoicesInput.schema';
import { ClinicCreateOrConnectWithoutInvoicesInputObjectSchema as ClinicCreateOrConnectWithoutInvoicesInputObjectSchema } from './ClinicCreateOrConnectWithoutInvoicesInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ClinicCreateWithoutInvoicesInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutInvoicesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ClinicCreateOrConnectWithoutInvoicesInputObjectSchema).optional(),
  connect: z.lazy(() => ClinicWhereUniqueInputObjectSchema).optional()
}).strict();
export const ClinicCreateNestedOneWithoutInvoicesInputObjectSchema: z.ZodType<Prisma.ClinicCreateNestedOneWithoutInvoicesInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateNestedOneWithoutInvoicesInput>;
export const ClinicCreateNestedOneWithoutInvoicesInputObjectZodSchema = makeSchema();
