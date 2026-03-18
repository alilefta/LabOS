import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutClinicInputObjectSchema as CaseCreateWithoutClinicInputObjectSchema } from './CaseCreateWithoutClinicInput.schema';
import { CaseUncheckedCreateWithoutClinicInputObjectSchema as CaseUncheckedCreateWithoutClinicInputObjectSchema } from './CaseUncheckedCreateWithoutClinicInput.schema';
import { CaseCreateOrConnectWithoutClinicInputObjectSchema as CaseCreateOrConnectWithoutClinicInputObjectSchema } from './CaseCreateOrConnectWithoutClinicInput.schema';
import { CaseUpsertWithWhereUniqueWithoutClinicInputObjectSchema as CaseUpsertWithWhereUniqueWithoutClinicInputObjectSchema } from './CaseUpsertWithWhereUniqueWithoutClinicInput.schema';
import { CaseCreateManyClinicInputEnvelopeObjectSchema as CaseCreateManyClinicInputEnvelopeObjectSchema } from './CaseCreateManyClinicInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithWhereUniqueWithoutClinicInputObjectSchema as CaseUpdateWithWhereUniqueWithoutClinicInputObjectSchema } from './CaseUpdateWithWhereUniqueWithoutClinicInput.schema';
import { CaseUpdateManyWithWhereWithoutClinicInputObjectSchema as CaseUpdateManyWithWhereWithoutClinicInputObjectSchema } from './CaseUpdateManyWithWhereWithoutClinicInput.schema';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutClinicInputObjectSchema), z.lazy(() => CaseCreateWithoutClinicInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutClinicInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutClinicInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutClinicInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutClinicInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutClinicInputObjectSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutClinicInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyClinicInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutClinicInputObjectSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutClinicInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutClinicInputObjectSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutClinicInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputObjectSchema), z.lazy(() => CaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseUpdateManyWithoutClinicNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithoutClinicNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithoutClinicNestedInput>;
export const CaseUpdateManyWithoutClinicNestedInputObjectZodSchema = makeSchema();
