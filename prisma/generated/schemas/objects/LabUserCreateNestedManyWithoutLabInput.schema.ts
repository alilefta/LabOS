import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCreateWithoutLabInputObjectSchema as LabUserCreateWithoutLabInputObjectSchema } from './LabUserCreateWithoutLabInput.schema';
import { LabUserUncheckedCreateWithoutLabInputObjectSchema as LabUserUncheckedCreateWithoutLabInputObjectSchema } from './LabUserUncheckedCreateWithoutLabInput.schema';
import { LabUserCreateOrConnectWithoutLabInputObjectSchema as LabUserCreateOrConnectWithoutLabInputObjectSchema } from './LabUserCreateOrConnectWithoutLabInput.schema';
import { LabUserCreateManyLabInputEnvelopeObjectSchema as LabUserCreateManyLabInputEnvelopeObjectSchema } from './LabUserCreateManyLabInputEnvelope.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabUserCreateWithoutLabInputObjectSchema), z.lazy(() => LabUserCreateWithoutLabInputObjectSchema).array(), z.lazy(() => LabUserUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => LabUserCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => LabUserCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => LabUserCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => LabUserWhereUniqueInputObjectSchema), z.lazy(() => LabUserWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const LabUserCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.LabUserCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateNestedManyWithoutLabInput>;
export const LabUserCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
