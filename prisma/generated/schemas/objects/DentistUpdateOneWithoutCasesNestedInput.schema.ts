import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistCreateWithoutCasesInputObjectSchema as DentistCreateWithoutCasesInputObjectSchema } from './DentistCreateWithoutCasesInput.schema';
import { DentistUncheckedCreateWithoutCasesInputObjectSchema as DentistUncheckedCreateWithoutCasesInputObjectSchema } from './DentistUncheckedCreateWithoutCasesInput.schema';
import { DentistCreateOrConnectWithoutCasesInputObjectSchema as DentistCreateOrConnectWithoutCasesInputObjectSchema } from './DentistCreateOrConnectWithoutCasesInput.schema';
import { DentistUpsertWithoutCasesInputObjectSchema as DentistUpsertWithoutCasesInputObjectSchema } from './DentistUpsertWithoutCasesInput.schema';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './DentistWhereInput.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema';
import { DentistUpdateToOneWithWhereWithoutCasesInputObjectSchema as DentistUpdateToOneWithWhereWithoutCasesInputObjectSchema } from './DentistUpdateToOneWithWhereWithoutCasesInput.schema';
import { DentistUpdateWithoutCasesInputObjectSchema as DentistUpdateWithoutCasesInputObjectSchema } from './DentistUpdateWithoutCasesInput.schema';
import { DentistUncheckedUpdateWithoutCasesInputObjectSchema as DentistUncheckedUpdateWithoutCasesInputObjectSchema } from './DentistUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DentistCreateWithoutCasesInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => DentistCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  upsert: z.lazy(() => DentistUpsertWithoutCasesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => DentistWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => DentistWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => DentistWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => DentistUpdateToOneWithWhereWithoutCasesInputObjectSchema), z.lazy(() => DentistUpdateWithoutCasesInputObjectSchema), z.lazy(() => DentistUncheckedUpdateWithoutCasesInputObjectSchema)]).optional()
}).strict();
export const DentistUpdateOneWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.DentistUpdateOneWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpdateOneWithoutCasesNestedInput>;
export const DentistUpdateOneWithoutCasesNestedInputObjectZodSchema = makeSchema();
