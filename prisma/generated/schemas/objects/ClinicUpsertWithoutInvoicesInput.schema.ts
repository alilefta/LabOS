import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicUpdateWithoutInvoicesInputObjectSchema as ClinicUpdateWithoutInvoicesInputObjectSchema } from './ClinicUpdateWithoutInvoicesInput.schema';
import { ClinicUncheckedUpdateWithoutInvoicesInputObjectSchema as ClinicUncheckedUpdateWithoutInvoicesInputObjectSchema } from './ClinicUncheckedUpdateWithoutInvoicesInput.schema';
import { ClinicCreateWithoutInvoicesInputObjectSchema as ClinicCreateWithoutInvoicesInputObjectSchema } from './ClinicCreateWithoutInvoicesInput.schema';
import { ClinicUncheckedCreateWithoutInvoicesInputObjectSchema as ClinicUncheckedCreateWithoutInvoicesInputObjectSchema } from './ClinicUncheckedCreateWithoutInvoicesInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ClinicUpdateWithoutInvoicesInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutInvoicesInputObjectSchema)]),
  create: z.union([z.lazy(() => ClinicCreateWithoutInvoicesInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutInvoicesInputObjectSchema)]),
  where: z.lazy(() => ClinicWhereInputObjectSchema).optional()
}).strict();
export const ClinicUpsertWithoutInvoicesInputObjectSchema: z.ZodType<Prisma.ClinicUpsertWithoutInvoicesInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpsertWithoutInvoicesInput>;
export const ClinicUpsertWithoutInvoicesInputObjectZodSchema = makeSchema();
