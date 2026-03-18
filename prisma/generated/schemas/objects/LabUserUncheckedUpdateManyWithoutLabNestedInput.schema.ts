import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCreateWithoutLabInputObjectSchema as LabUserCreateWithoutLabInputObjectSchema } from './LabUserCreateWithoutLabInput.schema';
import { LabUserUncheckedCreateWithoutLabInputObjectSchema as LabUserUncheckedCreateWithoutLabInputObjectSchema } from './LabUserUncheckedCreateWithoutLabInput.schema';
import { LabUserCreateOrConnectWithoutLabInputObjectSchema as LabUserCreateOrConnectWithoutLabInputObjectSchema } from './LabUserCreateOrConnectWithoutLabInput.schema';
import { LabUserUpsertWithWhereUniqueWithoutLabInputObjectSchema as LabUserUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './LabUserUpsertWithWhereUniqueWithoutLabInput.schema';
import { LabUserCreateManyLabInputEnvelopeObjectSchema as LabUserCreateManyLabInputEnvelopeObjectSchema } from './LabUserCreateManyLabInputEnvelope.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema';
import { LabUserUpdateWithWhereUniqueWithoutLabInputObjectSchema as LabUserUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './LabUserUpdateWithWhereUniqueWithoutLabInput.schema';
import { LabUserUpdateManyWithWhereWithoutLabInputObjectSchema as LabUserUpdateManyWithWhereWithoutLabInputObjectSchema } from './LabUserUpdateManyWithWhereWithoutLabInput.schema';
import { LabUserScalarWhereInputObjectSchema as LabUserScalarWhereInputObjectSchema } from './LabUserScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabUserCreateWithoutLabInputObjectSchema), z.lazy(() => LabUserCreateWithoutLabInputObjectSchema).array(), z.lazy(() => LabUserUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => LabUserCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => LabUserCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => LabUserUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => LabUserUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => LabUserCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => LabUserWhereUniqueInputObjectSchema), z.lazy(() => LabUserWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => LabUserWhereUniqueInputObjectSchema), z.lazy(() => LabUserWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => LabUserWhereUniqueInputObjectSchema), z.lazy(() => LabUserWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => LabUserWhereUniqueInputObjectSchema), z.lazy(() => LabUserWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => LabUserUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => LabUserUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => LabUserUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => LabUserUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => LabUserScalarWhereInputObjectSchema), z.lazy(() => LabUserScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const LabUserUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.LabUserUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUncheckedUpdateManyWithoutLabNestedInput>;
export const LabUserUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
