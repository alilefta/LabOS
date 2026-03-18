import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianCreateWithoutLabInputObjectSchema as TechnicianCreateWithoutLabInputObjectSchema } from './TechnicianCreateWithoutLabInput.schema';
import { TechnicianUncheckedCreateWithoutLabInputObjectSchema as TechnicianUncheckedCreateWithoutLabInputObjectSchema } from './TechnicianUncheckedCreateWithoutLabInput.schema';
import { TechnicianCreateOrConnectWithoutLabInputObjectSchema as TechnicianCreateOrConnectWithoutLabInputObjectSchema } from './TechnicianCreateOrConnectWithoutLabInput.schema';
import { TechnicianCreateManyLabInputEnvelopeObjectSchema as TechnicianCreateManyLabInputEnvelopeObjectSchema } from './TechnicianCreateManyLabInputEnvelope.schema';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './TechnicianWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TechnicianCreateWithoutLabInputObjectSchema), z.lazy(() => TechnicianCreateWithoutLabInputObjectSchema).array(), z.lazy(() => TechnicianUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => TechnicianUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TechnicianCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => TechnicianCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TechnicianCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => TechnicianWhereUniqueInputObjectSchema), z.lazy(() => TechnicianWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const TechnicianCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.TechnicianCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianCreateNestedManyWithoutLabInput>;
export const TechnicianCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
