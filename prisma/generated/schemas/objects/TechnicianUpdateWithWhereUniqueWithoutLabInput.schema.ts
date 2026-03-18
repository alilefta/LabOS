import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './TechnicianWhereUniqueInput.schema';
import { TechnicianUpdateWithoutLabInputObjectSchema as TechnicianUpdateWithoutLabInputObjectSchema } from './TechnicianUpdateWithoutLabInput.schema';
import { TechnicianUncheckedUpdateWithoutLabInputObjectSchema as TechnicianUncheckedUpdateWithoutLabInputObjectSchema } from './TechnicianUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TechnicianWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => TechnicianUpdateWithoutLabInputObjectSchema), z.lazy(() => TechnicianUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const TechnicianUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.TechnicianUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianUpdateWithWhereUniqueWithoutLabInput>;
export const TechnicianUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
