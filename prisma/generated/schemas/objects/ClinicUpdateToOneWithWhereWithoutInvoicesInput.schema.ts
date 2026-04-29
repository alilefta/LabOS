import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema';
import { ClinicUpdateWithoutInvoicesInputObjectSchema as ClinicUpdateWithoutInvoicesInputObjectSchema } from './ClinicUpdateWithoutInvoicesInput.schema';
import { ClinicUncheckedUpdateWithoutInvoicesInputObjectSchema as ClinicUncheckedUpdateWithoutInvoicesInputObjectSchema } from './ClinicUncheckedUpdateWithoutInvoicesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ClinicUpdateWithoutInvoicesInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutInvoicesInputObjectSchema)])
}).strict();
export const ClinicUpdateToOneWithWhereWithoutInvoicesInputObjectSchema: z.ZodType<Prisma.ClinicUpdateToOneWithWhereWithoutInvoicesInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateToOneWithWhereWithoutInvoicesInput>;
export const ClinicUpdateToOneWithWhereWithoutInvoicesInputObjectZodSchema = makeSchema();
