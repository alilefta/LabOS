import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateWithoutDentistsInputObjectSchema as ClinicCreateWithoutDentistsInputObjectSchema } from './ClinicCreateWithoutDentistsInput.schema';
import { ClinicUncheckedCreateWithoutDentistsInputObjectSchema as ClinicUncheckedCreateWithoutDentistsInputObjectSchema } from './ClinicUncheckedCreateWithoutDentistsInput.schema';
import { ClinicCreateOrConnectWithoutDentistsInputObjectSchema as ClinicCreateOrConnectWithoutDentistsInputObjectSchema } from './ClinicCreateOrConnectWithoutDentistsInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ClinicCreateWithoutDentistsInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutDentistsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ClinicCreateOrConnectWithoutDentistsInputObjectSchema).optional(),
  connect: z.lazy(() => ClinicWhereUniqueInputObjectSchema).optional()
}).strict();
export const ClinicCreateNestedOneWithoutDentistsInputObjectSchema: z.ZodType<Prisma.ClinicCreateNestedOneWithoutDentistsInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateNestedOneWithoutDentistsInput>;
export const ClinicCreateNestedOneWithoutDentistsInputObjectZodSchema = makeSchema();
