import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicUpdateWithoutLabInputObjectSchema as ClinicUpdateWithoutLabInputObjectSchema } from './ClinicUpdateWithoutLabInput.schema';
import { ClinicUncheckedUpdateWithoutLabInputObjectSchema as ClinicUncheckedUpdateWithoutLabInputObjectSchema } from './ClinicUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ClinicUpdateWithoutLabInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const ClinicUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.ClinicUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateWithWhereUniqueWithoutLabInput>;
export const ClinicUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
