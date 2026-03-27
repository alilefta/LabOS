import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema';
import { DentistUpdateWithoutLabInputObjectSchema as DentistUpdateWithoutLabInputObjectSchema } from './DentistUpdateWithoutLabInput.schema';
import { DentistUncheckedUpdateWithoutLabInputObjectSchema as DentistUncheckedUpdateWithoutLabInputObjectSchema } from './DentistUncheckedUpdateWithoutLabInput.schema';
import { DentistCreateWithoutLabInputObjectSchema as DentistCreateWithoutLabInputObjectSchema } from './DentistCreateWithoutLabInput.schema';
import { DentistUncheckedCreateWithoutLabInputObjectSchema as DentistUncheckedCreateWithoutLabInputObjectSchema } from './DentistUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => DentistUpdateWithoutLabInputObjectSchema), z.lazy(() => DentistUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => DentistCreateWithoutLabInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const DentistUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.DentistUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpsertWithWhereUniqueWithoutLabInput>;
export const DentistUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
