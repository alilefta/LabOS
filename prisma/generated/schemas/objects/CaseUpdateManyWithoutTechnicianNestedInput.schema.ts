import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutTechnicianInputObjectSchema as CaseCreateWithoutTechnicianInputObjectSchema } from './CaseCreateWithoutTechnicianInput.schema';
import { CaseUncheckedCreateWithoutTechnicianInputObjectSchema as CaseUncheckedCreateWithoutTechnicianInputObjectSchema } from './CaseUncheckedCreateWithoutTechnicianInput.schema';
import { CaseCreateOrConnectWithoutTechnicianInputObjectSchema as CaseCreateOrConnectWithoutTechnicianInputObjectSchema } from './CaseCreateOrConnectWithoutTechnicianInput.schema';
import { CaseUpsertWithWhereUniqueWithoutTechnicianInputObjectSchema as CaseUpsertWithWhereUniqueWithoutTechnicianInputObjectSchema } from './CaseUpsertWithWhereUniqueWithoutTechnicianInput.schema';
import { CaseCreateManyTechnicianInputEnvelopeObjectSchema as CaseCreateManyTechnicianInputEnvelopeObjectSchema } from './CaseCreateManyTechnicianInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithWhereUniqueWithoutTechnicianInputObjectSchema as CaseUpdateWithWhereUniqueWithoutTechnicianInputObjectSchema } from './CaseUpdateWithWhereUniqueWithoutTechnicianInput.schema';
import { CaseUpdateManyWithWhereWithoutTechnicianInputObjectSchema as CaseUpdateManyWithWhereWithoutTechnicianInputObjectSchema } from './CaseUpdateManyWithWhereWithoutTechnicianInput.schema';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutTechnicianInputObjectSchema), z.lazy(() => CaseCreateWithoutTechnicianInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutTechnicianInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutTechnicianInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutTechnicianInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutTechnicianInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutTechnicianInputObjectSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutTechnicianInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyTechnicianInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutTechnicianInputObjectSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutTechnicianInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutTechnicianInputObjectSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutTechnicianInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputObjectSchema), z.lazy(() => CaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseUpdateManyWithoutTechnicianNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithoutTechnicianNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithoutTechnicianNestedInput>;
export const CaseUpdateManyWithoutTechnicianNestedInputObjectZodSchema = makeSchema();
