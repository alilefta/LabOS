import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicUpdateWithoutDentistsInputObjectSchema as ClinicUpdateWithoutDentistsInputObjectSchema } from './ClinicUpdateWithoutDentistsInput.schema';
import { ClinicUncheckedUpdateWithoutDentistsInputObjectSchema as ClinicUncheckedUpdateWithoutDentistsInputObjectSchema } from './ClinicUncheckedUpdateWithoutDentistsInput.schema';
import { ClinicCreateWithoutDentistsInputObjectSchema as ClinicCreateWithoutDentistsInputObjectSchema } from './ClinicCreateWithoutDentistsInput.schema';
import { ClinicUncheckedCreateWithoutDentistsInputObjectSchema as ClinicUncheckedCreateWithoutDentistsInputObjectSchema } from './ClinicUncheckedCreateWithoutDentistsInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ClinicUpdateWithoutDentistsInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutDentistsInputObjectSchema)]),
  create: z.union([z.lazy(() => ClinicCreateWithoutDentistsInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutDentistsInputObjectSchema)]),
  where: z.lazy(() => ClinicWhereInputObjectSchema).optional()
}).strict();
export const ClinicUpsertWithoutDentistsInputObjectSchema: z.ZodType<Prisma.ClinicUpsertWithoutDentistsInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpsertWithoutDentistsInput>;
export const ClinicUpsertWithoutDentistsInputObjectZodSchema = makeSchema();
