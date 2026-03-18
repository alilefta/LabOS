import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianUpdateWithoutCasesInputObjectSchema as TechnicianUpdateWithoutCasesInputObjectSchema } from './TechnicianUpdateWithoutCasesInput.schema';
import { TechnicianUncheckedUpdateWithoutCasesInputObjectSchema as TechnicianUncheckedUpdateWithoutCasesInputObjectSchema } from './TechnicianUncheckedUpdateWithoutCasesInput.schema';
import { TechnicianCreateWithoutCasesInputObjectSchema as TechnicianCreateWithoutCasesInputObjectSchema } from './TechnicianCreateWithoutCasesInput.schema';
import { TechnicianUncheckedCreateWithoutCasesInputObjectSchema as TechnicianUncheckedCreateWithoutCasesInputObjectSchema } from './TechnicianUncheckedCreateWithoutCasesInput.schema';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './TechnicianWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => TechnicianUpdateWithoutCasesInputObjectSchema), z.lazy(() => TechnicianUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => TechnicianCreateWithoutCasesInputObjectSchema), z.lazy(() => TechnicianUncheckedCreateWithoutCasesInputObjectSchema)]),
  where: z.lazy(() => TechnicianWhereInputObjectSchema).optional()
}).strict();
export const TechnicianUpsertWithoutCasesInputObjectSchema: z.ZodType<Prisma.TechnicianUpsertWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianUpsertWithoutCasesInput>;
export const TechnicianUpsertWithoutCasesInputObjectZodSchema = makeSchema();
