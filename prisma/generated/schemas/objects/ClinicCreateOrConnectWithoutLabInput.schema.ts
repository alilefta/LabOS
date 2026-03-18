import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicCreateWithoutLabInputObjectSchema as ClinicCreateWithoutLabInputObjectSchema } from './ClinicCreateWithoutLabInput.schema';
import { ClinicUncheckedCreateWithoutLabInputObjectSchema as ClinicUncheckedCreateWithoutLabInputObjectSchema } from './ClinicUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ClinicCreateWithoutLabInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const ClinicCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.ClinicCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateOrConnectWithoutLabInput>;
export const ClinicCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
