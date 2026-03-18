import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutLabInputObjectSchema as CaseCreateWithoutLabInputObjectSchema } from './CaseCreateWithoutLabInput.schema';
import { CaseUncheckedCreateWithoutLabInputObjectSchema as CaseUncheckedCreateWithoutLabInputObjectSchema } from './CaseUncheckedCreateWithoutLabInput.schema';
import { CaseCreateOrConnectWithoutLabInputObjectSchema as CaseCreateOrConnectWithoutLabInputObjectSchema } from './CaseCreateOrConnectWithoutLabInput.schema';
import { CaseUpsertWithWhereUniqueWithoutLabInputObjectSchema as CaseUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './CaseUpsertWithWhereUniqueWithoutLabInput.schema';
import { CaseCreateManyLabInputEnvelopeObjectSchema as CaseCreateManyLabInputEnvelopeObjectSchema } from './CaseCreateManyLabInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithWhereUniqueWithoutLabInputObjectSchema as CaseUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './CaseUpdateWithWhereUniqueWithoutLabInput.schema';
import { CaseUpdateManyWithWhereWithoutLabInputObjectSchema as CaseUpdateManyWithWhereWithoutLabInputObjectSchema } from './CaseUpdateManyWithWhereWithoutLabInput.schema';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutLabInputObjectSchema), z.lazy(() => CaseCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputObjectSchema), z.lazy(() => CaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithoutLabNestedInput>;
export const CaseUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
