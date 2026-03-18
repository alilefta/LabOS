import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './TechnicianWhereUniqueInput.schema';
import { TechnicianUpdateWithoutLabInputObjectSchema as TechnicianUpdateWithoutLabInputObjectSchema } from './TechnicianUpdateWithoutLabInput.schema';
import { TechnicianUncheckedUpdateWithoutLabInputObjectSchema as TechnicianUncheckedUpdateWithoutLabInputObjectSchema } from './TechnicianUncheckedUpdateWithoutLabInput.schema';
import { TechnicianCreateWithoutLabInputObjectSchema as TechnicianCreateWithoutLabInputObjectSchema } from './TechnicianCreateWithoutLabInput.schema';
import { TechnicianUncheckedCreateWithoutLabInputObjectSchema as TechnicianUncheckedCreateWithoutLabInputObjectSchema } from './TechnicianUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TechnicianWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => TechnicianUpdateWithoutLabInputObjectSchema), z.lazy(() => TechnicianUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => TechnicianCreateWithoutLabInputObjectSchema), z.lazy(() => TechnicianUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const TechnicianUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.TechnicianUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianUpsertWithWhereUniqueWithoutLabInput>;
export const TechnicianUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
