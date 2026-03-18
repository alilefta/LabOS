import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './TechnicianWhereUniqueInput.schema';
import { TechnicianCreateWithoutLabInputObjectSchema as TechnicianCreateWithoutLabInputObjectSchema } from './TechnicianCreateWithoutLabInput.schema';
import { TechnicianUncheckedCreateWithoutLabInputObjectSchema as TechnicianUncheckedCreateWithoutLabInputObjectSchema } from './TechnicianUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TechnicianWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TechnicianCreateWithoutLabInputObjectSchema), z.lazy(() => TechnicianUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const TechnicianCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.TechnicianCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianCreateOrConnectWithoutLabInput>;
export const TechnicianCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
