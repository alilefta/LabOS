import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianCreateWithoutCasesInputObjectSchema as TechnicianCreateWithoutCasesInputObjectSchema } from './TechnicianCreateWithoutCasesInput.schema';
import { TechnicianUncheckedCreateWithoutCasesInputObjectSchema as TechnicianUncheckedCreateWithoutCasesInputObjectSchema } from './TechnicianUncheckedCreateWithoutCasesInput.schema';
import { TechnicianCreateOrConnectWithoutCasesInputObjectSchema as TechnicianCreateOrConnectWithoutCasesInputObjectSchema } from './TechnicianCreateOrConnectWithoutCasesInput.schema';
import { TechnicianUpsertWithoutCasesInputObjectSchema as TechnicianUpsertWithoutCasesInputObjectSchema } from './TechnicianUpsertWithoutCasesInput.schema';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './TechnicianWhereInput.schema';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './TechnicianWhereUniqueInput.schema';
import { TechnicianUpdateToOneWithWhereWithoutCasesInputObjectSchema as TechnicianUpdateToOneWithWhereWithoutCasesInputObjectSchema } from './TechnicianUpdateToOneWithWhereWithoutCasesInput.schema';
import { TechnicianUpdateWithoutCasesInputObjectSchema as TechnicianUpdateWithoutCasesInputObjectSchema } from './TechnicianUpdateWithoutCasesInput.schema';
import { TechnicianUncheckedUpdateWithoutCasesInputObjectSchema as TechnicianUncheckedUpdateWithoutCasesInputObjectSchema } from './TechnicianUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TechnicianCreateWithoutCasesInputObjectSchema), z.lazy(() => TechnicianUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => TechnicianCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  upsert: z.lazy(() => TechnicianUpsertWithoutCasesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => TechnicianWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => TechnicianWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => TechnicianWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => TechnicianUpdateToOneWithWhereWithoutCasesInputObjectSchema), z.lazy(() => TechnicianUpdateWithoutCasesInputObjectSchema), z.lazy(() => TechnicianUncheckedUpdateWithoutCasesInputObjectSchema)]).optional()
}).strict();
export const TechnicianUpdateOneWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.TechnicianUpdateOneWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianUpdateOneWithoutCasesNestedInput>;
export const TechnicianUpdateOneWithoutCasesNestedInputObjectZodSchema = makeSchema();
