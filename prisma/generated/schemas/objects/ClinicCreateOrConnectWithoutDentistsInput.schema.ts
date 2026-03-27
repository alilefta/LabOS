import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicCreateWithoutDentistsInputObjectSchema as ClinicCreateWithoutDentistsInputObjectSchema } from './ClinicCreateWithoutDentistsInput.schema';
import { ClinicUncheckedCreateWithoutDentistsInputObjectSchema as ClinicUncheckedCreateWithoutDentistsInputObjectSchema } from './ClinicUncheckedCreateWithoutDentistsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ClinicCreateWithoutDentistsInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutDentistsInputObjectSchema)])
}).strict();
export const ClinicCreateOrConnectWithoutDentistsInputObjectSchema: z.ZodType<Prisma.ClinicCreateOrConnectWithoutDentistsInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateOrConnectWithoutDentistsInput>;
export const ClinicCreateOrConnectWithoutDentistsInputObjectZodSchema = makeSchema();
