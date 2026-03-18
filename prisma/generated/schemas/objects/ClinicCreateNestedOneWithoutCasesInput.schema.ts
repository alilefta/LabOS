import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateWithoutCasesInputObjectSchema as ClinicCreateWithoutCasesInputObjectSchema } from './ClinicCreateWithoutCasesInput.schema';
import { ClinicUncheckedCreateWithoutCasesInputObjectSchema as ClinicUncheckedCreateWithoutCasesInputObjectSchema } from './ClinicUncheckedCreateWithoutCasesInput.schema';
import { ClinicCreateOrConnectWithoutCasesInputObjectSchema as ClinicCreateOrConnectWithoutCasesInputObjectSchema } from './ClinicCreateOrConnectWithoutCasesInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ClinicCreateWithoutCasesInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ClinicCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => ClinicWhereUniqueInputObjectSchema).optional()
}).strict();
export const ClinicCreateNestedOneWithoutCasesInputObjectSchema: z.ZodType<Prisma.ClinicCreateNestedOneWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateNestedOneWithoutCasesInput>;
export const ClinicCreateNestedOneWithoutCasesInputObjectZodSchema = makeSchema();
