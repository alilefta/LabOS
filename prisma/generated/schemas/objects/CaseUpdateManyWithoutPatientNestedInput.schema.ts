import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutPatientInputObjectSchema as CaseCreateWithoutPatientInputObjectSchema } from './CaseCreateWithoutPatientInput.schema';
import { CaseUncheckedCreateWithoutPatientInputObjectSchema as CaseUncheckedCreateWithoutPatientInputObjectSchema } from './CaseUncheckedCreateWithoutPatientInput.schema';
import { CaseCreateOrConnectWithoutPatientInputObjectSchema as CaseCreateOrConnectWithoutPatientInputObjectSchema } from './CaseCreateOrConnectWithoutPatientInput.schema';
import { CaseUpsertWithWhereUniqueWithoutPatientInputObjectSchema as CaseUpsertWithWhereUniqueWithoutPatientInputObjectSchema } from './CaseUpsertWithWhereUniqueWithoutPatientInput.schema';
import { CaseCreateManyPatientInputEnvelopeObjectSchema as CaseCreateManyPatientInputEnvelopeObjectSchema } from './CaseCreateManyPatientInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithWhereUniqueWithoutPatientInputObjectSchema as CaseUpdateWithWhereUniqueWithoutPatientInputObjectSchema } from './CaseUpdateWithWhereUniqueWithoutPatientInput.schema';
import { CaseUpdateManyWithWhereWithoutPatientInputObjectSchema as CaseUpdateManyWithWhereWithoutPatientInputObjectSchema } from './CaseUpdateManyWithWhereWithoutPatientInput.schema';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutPatientInputObjectSchema), z.lazy(() => CaseCreateWithoutPatientInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutPatientInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutPatientInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutPatientInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutPatientInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutPatientInputObjectSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutPatientInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyPatientInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutPatientInputObjectSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutPatientInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutPatientInputObjectSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutPatientInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputObjectSchema), z.lazy(() => CaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseUpdateManyWithoutPatientNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithoutPatientNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithoutPatientNestedInput>;
export const CaseUpdateManyWithoutPatientNestedInputObjectZodSchema = makeSchema();
