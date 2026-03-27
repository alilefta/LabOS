import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema';
import { DentistUpdateWithoutLabInputObjectSchema as DentistUpdateWithoutLabInputObjectSchema } from './DentistUpdateWithoutLabInput.schema';
import { DentistUncheckedUpdateWithoutLabInputObjectSchema as DentistUncheckedUpdateWithoutLabInputObjectSchema } from './DentistUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => DentistUpdateWithoutLabInputObjectSchema), z.lazy(() => DentistUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const DentistUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.DentistUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpdateWithWhereUniqueWithoutLabInput>;
export const DentistUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
