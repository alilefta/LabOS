import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicCreateWithoutCasesInputObjectSchema as ClinicCreateWithoutCasesInputObjectSchema } from './ClinicCreateWithoutCasesInput.schema';
import { ClinicUncheckedCreateWithoutCasesInputObjectSchema as ClinicUncheckedCreateWithoutCasesInputObjectSchema } from './ClinicUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ClinicCreateWithoutCasesInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const ClinicCreateOrConnectWithoutCasesInputObjectSchema: z.ZodType<Prisma.ClinicCreateOrConnectWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateOrConnectWithoutCasesInput>;
export const ClinicCreateOrConnectWithoutCasesInputObjectZodSchema = makeSchema();
