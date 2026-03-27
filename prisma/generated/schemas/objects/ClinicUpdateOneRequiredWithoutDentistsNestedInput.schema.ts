import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateWithoutDentistsInputObjectSchema as ClinicCreateWithoutDentistsInputObjectSchema } from './ClinicCreateWithoutDentistsInput.schema';
import { ClinicUncheckedCreateWithoutDentistsInputObjectSchema as ClinicUncheckedCreateWithoutDentistsInputObjectSchema } from './ClinicUncheckedCreateWithoutDentistsInput.schema';
import { ClinicCreateOrConnectWithoutDentistsInputObjectSchema as ClinicCreateOrConnectWithoutDentistsInputObjectSchema } from './ClinicCreateOrConnectWithoutDentistsInput.schema';
import { ClinicUpsertWithoutDentistsInputObjectSchema as ClinicUpsertWithoutDentistsInputObjectSchema } from './ClinicUpsertWithoutDentistsInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicUpdateToOneWithWhereWithoutDentistsInputObjectSchema as ClinicUpdateToOneWithWhereWithoutDentistsInputObjectSchema } from './ClinicUpdateToOneWithWhereWithoutDentistsInput.schema';
import { ClinicUpdateWithoutDentistsInputObjectSchema as ClinicUpdateWithoutDentistsInputObjectSchema } from './ClinicUpdateWithoutDentistsInput.schema';
import { ClinicUncheckedUpdateWithoutDentistsInputObjectSchema as ClinicUncheckedUpdateWithoutDentistsInputObjectSchema } from './ClinicUncheckedUpdateWithoutDentistsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ClinicCreateWithoutDentistsInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutDentistsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ClinicCreateOrConnectWithoutDentistsInputObjectSchema).optional(),
  upsert: z.lazy(() => ClinicUpsertWithoutDentistsInputObjectSchema).optional(),
  connect: z.lazy(() => ClinicWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ClinicUpdateToOneWithWhereWithoutDentistsInputObjectSchema), z.lazy(() => ClinicUpdateWithoutDentistsInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutDentistsInputObjectSchema)]).optional()
}).strict();
export const ClinicUpdateOneRequiredWithoutDentistsNestedInputObjectSchema: z.ZodType<Prisma.ClinicUpdateOneRequiredWithoutDentistsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateOneRequiredWithoutDentistsNestedInput>;
export const ClinicUpdateOneRequiredWithoutDentistsNestedInputObjectZodSchema = makeSchema();
