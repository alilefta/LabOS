import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistUpdateWithoutCasesInputObjectSchema as DentistUpdateWithoutCasesInputObjectSchema } from './DentistUpdateWithoutCasesInput.schema';
import { DentistUncheckedUpdateWithoutCasesInputObjectSchema as DentistUncheckedUpdateWithoutCasesInputObjectSchema } from './DentistUncheckedUpdateWithoutCasesInput.schema';
import { DentistCreateWithoutCasesInputObjectSchema as DentistCreateWithoutCasesInputObjectSchema } from './DentistCreateWithoutCasesInput.schema';
import { DentistUncheckedCreateWithoutCasesInputObjectSchema as DentistUncheckedCreateWithoutCasesInputObjectSchema } from './DentistUncheckedCreateWithoutCasesInput.schema';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './DentistWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => DentistUpdateWithoutCasesInputObjectSchema), z.lazy(() => DentistUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => DentistCreateWithoutCasesInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutCasesInputObjectSchema)]),
  where: z.lazy(() => DentistWhereInputObjectSchema).optional()
}).strict();
export const DentistUpsertWithoutCasesInputObjectSchema: z.ZodType<Prisma.DentistUpsertWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpsertWithoutCasesInput>;
export const DentistUpsertWithoutCasesInputObjectZodSchema = makeSchema();
