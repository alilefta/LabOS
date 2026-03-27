import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './DentistWhereInput.schema';
import { DentistUpdateWithoutCasesInputObjectSchema as DentistUpdateWithoutCasesInputObjectSchema } from './DentistUpdateWithoutCasesInput.schema';
import { DentistUncheckedUpdateWithoutCasesInputObjectSchema as DentistUncheckedUpdateWithoutCasesInputObjectSchema } from './DentistUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => DentistUpdateWithoutCasesInputObjectSchema), z.lazy(() => DentistUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const DentistUpdateToOneWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.DentistUpdateToOneWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpdateToOneWithWhereWithoutCasesInput>;
export const DentistUpdateToOneWithWhereWithoutCasesInputObjectZodSchema = makeSchema();
