import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema';
import { ClinicUpdateWithoutCasesInputObjectSchema as ClinicUpdateWithoutCasesInputObjectSchema } from './ClinicUpdateWithoutCasesInput.schema';
import { ClinicUncheckedUpdateWithoutCasesInputObjectSchema as ClinicUncheckedUpdateWithoutCasesInputObjectSchema } from './ClinicUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ClinicUpdateWithoutCasesInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const ClinicUpdateToOneWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.ClinicUpdateToOneWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateToOneWithWhereWithoutCasesInput>;
export const ClinicUpdateToOneWithWhereWithoutCasesInputObjectZodSchema = makeSchema();
