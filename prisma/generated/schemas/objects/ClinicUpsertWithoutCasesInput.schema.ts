import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicUpdateWithoutCasesInputObjectSchema as ClinicUpdateWithoutCasesInputObjectSchema } from './ClinicUpdateWithoutCasesInput.schema';
import { ClinicUncheckedUpdateWithoutCasesInputObjectSchema as ClinicUncheckedUpdateWithoutCasesInputObjectSchema } from './ClinicUncheckedUpdateWithoutCasesInput.schema';
import { ClinicCreateWithoutCasesInputObjectSchema as ClinicCreateWithoutCasesInputObjectSchema } from './ClinicCreateWithoutCasesInput.schema';
import { ClinicUncheckedCreateWithoutCasesInputObjectSchema as ClinicUncheckedCreateWithoutCasesInputObjectSchema } from './ClinicUncheckedCreateWithoutCasesInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ClinicUpdateWithoutCasesInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => ClinicCreateWithoutCasesInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutCasesInputObjectSchema)]),
  where: z.lazy(() => ClinicWhereInputObjectSchema).optional()
}).strict();
export const ClinicUpsertWithoutCasesInputObjectSchema: z.ZodType<Prisma.ClinicUpsertWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpsertWithoutCasesInput>;
export const ClinicUpsertWithoutCasesInputObjectZodSchema = makeSchema();
