import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateWithoutCasesInputObjectSchema as ClinicCreateWithoutCasesInputObjectSchema } from './ClinicCreateWithoutCasesInput.schema';
import { ClinicUncheckedCreateWithoutCasesInputObjectSchema as ClinicUncheckedCreateWithoutCasesInputObjectSchema } from './ClinicUncheckedCreateWithoutCasesInput.schema';
import { ClinicCreateOrConnectWithoutCasesInputObjectSchema as ClinicCreateOrConnectWithoutCasesInputObjectSchema } from './ClinicCreateOrConnectWithoutCasesInput.schema';
import { ClinicUpsertWithoutCasesInputObjectSchema as ClinicUpsertWithoutCasesInputObjectSchema } from './ClinicUpsertWithoutCasesInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicUpdateToOneWithWhereWithoutCasesInputObjectSchema as ClinicUpdateToOneWithWhereWithoutCasesInputObjectSchema } from './ClinicUpdateToOneWithWhereWithoutCasesInput.schema';
import { ClinicUpdateWithoutCasesInputObjectSchema as ClinicUpdateWithoutCasesInputObjectSchema } from './ClinicUpdateWithoutCasesInput.schema';
import { ClinicUncheckedUpdateWithoutCasesInputObjectSchema as ClinicUncheckedUpdateWithoutCasesInputObjectSchema } from './ClinicUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ClinicCreateWithoutCasesInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ClinicCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  upsert: z.lazy(() => ClinicUpsertWithoutCasesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ClinicWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ClinicWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ClinicWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ClinicUpdateToOneWithWhereWithoutCasesInputObjectSchema), z.lazy(() => ClinicUpdateWithoutCasesInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutCasesInputObjectSchema)]).optional()
}).strict();
export const ClinicUpdateOneWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.ClinicUpdateOneWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateOneWithoutCasesNestedInput>;
export const ClinicUpdateOneWithoutCasesNestedInputObjectZodSchema = makeSchema();
