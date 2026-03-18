import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './TechnicianWhereInput.schema';
import { TechnicianUpdateWithoutCasesInputObjectSchema as TechnicianUpdateWithoutCasesInputObjectSchema } from './TechnicianUpdateWithoutCasesInput.schema';
import { TechnicianUncheckedUpdateWithoutCasesInputObjectSchema as TechnicianUncheckedUpdateWithoutCasesInputObjectSchema } from './TechnicianUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TechnicianWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => TechnicianUpdateWithoutCasesInputObjectSchema), z.lazy(() => TechnicianUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const TechnicianUpdateToOneWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.TechnicianUpdateToOneWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianUpdateToOneWithWhereWithoutCasesInput>;
export const TechnicianUpdateToOneWithWhereWithoutCasesInputObjectZodSchema = makeSchema();
