import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema';
import { ClinicUpdateWithoutDentistsInputObjectSchema as ClinicUpdateWithoutDentistsInputObjectSchema } from './ClinicUpdateWithoutDentistsInput.schema';
import { ClinicUncheckedUpdateWithoutDentistsInputObjectSchema as ClinicUncheckedUpdateWithoutDentistsInputObjectSchema } from './ClinicUncheckedUpdateWithoutDentistsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ClinicUpdateWithoutDentistsInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutDentistsInputObjectSchema)])
}).strict();
export const ClinicUpdateToOneWithWhereWithoutDentistsInputObjectSchema: z.ZodType<Prisma.ClinicUpdateToOneWithWhereWithoutDentistsInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateToOneWithWhereWithoutDentistsInput>;
export const ClinicUpdateToOneWithWhereWithoutDentistsInputObjectZodSchema = makeSchema();
