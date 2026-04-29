import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateWithoutInvoicesInputObjectSchema as ClinicCreateWithoutInvoicesInputObjectSchema } from './ClinicCreateWithoutInvoicesInput.schema';
import { ClinicUncheckedCreateWithoutInvoicesInputObjectSchema as ClinicUncheckedCreateWithoutInvoicesInputObjectSchema } from './ClinicUncheckedCreateWithoutInvoicesInput.schema';
import { ClinicCreateOrConnectWithoutInvoicesInputObjectSchema as ClinicCreateOrConnectWithoutInvoicesInputObjectSchema } from './ClinicCreateOrConnectWithoutInvoicesInput.schema';
import { ClinicUpsertWithoutInvoicesInputObjectSchema as ClinicUpsertWithoutInvoicesInputObjectSchema } from './ClinicUpsertWithoutInvoicesInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicUpdateToOneWithWhereWithoutInvoicesInputObjectSchema as ClinicUpdateToOneWithWhereWithoutInvoicesInputObjectSchema } from './ClinicUpdateToOneWithWhereWithoutInvoicesInput.schema';
import { ClinicUpdateWithoutInvoicesInputObjectSchema as ClinicUpdateWithoutInvoicesInputObjectSchema } from './ClinicUpdateWithoutInvoicesInput.schema';
import { ClinicUncheckedUpdateWithoutInvoicesInputObjectSchema as ClinicUncheckedUpdateWithoutInvoicesInputObjectSchema } from './ClinicUncheckedUpdateWithoutInvoicesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ClinicCreateWithoutInvoicesInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutInvoicesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ClinicCreateOrConnectWithoutInvoicesInputObjectSchema).optional(),
  upsert: z.lazy(() => ClinicUpsertWithoutInvoicesInputObjectSchema).optional(),
  connect: z.lazy(() => ClinicWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ClinicUpdateToOneWithWhereWithoutInvoicesInputObjectSchema), z.lazy(() => ClinicUpdateWithoutInvoicesInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutInvoicesInputObjectSchema)]).optional()
}).strict();
export const ClinicUpdateOneRequiredWithoutInvoicesNestedInputObjectSchema: z.ZodType<Prisma.ClinicUpdateOneRequiredWithoutInvoicesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateOneRequiredWithoutInvoicesNestedInput>;
export const ClinicUpdateOneRequiredWithoutInvoicesNestedInputObjectZodSchema = makeSchema();
