import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutDentistInputObjectSchema as CaseCreateWithoutDentistInputObjectSchema } from './CaseCreateWithoutDentistInput.schema';
import { CaseUncheckedCreateWithoutDentistInputObjectSchema as CaseUncheckedCreateWithoutDentistInputObjectSchema } from './CaseUncheckedCreateWithoutDentistInput.schema';
import { CaseCreateOrConnectWithoutDentistInputObjectSchema as CaseCreateOrConnectWithoutDentistInputObjectSchema } from './CaseCreateOrConnectWithoutDentistInput.schema';
import { CaseUpsertWithWhereUniqueWithoutDentistInputObjectSchema as CaseUpsertWithWhereUniqueWithoutDentistInputObjectSchema } from './CaseUpsertWithWhereUniqueWithoutDentistInput.schema';
import { CaseCreateManyDentistInputEnvelopeObjectSchema as CaseCreateManyDentistInputEnvelopeObjectSchema } from './CaseCreateManyDentistInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithWhereUniqueWithoutDentistInputObjectSchema as CaseUpdateWithWhereUniqueWithoutDentistInputObjectSchema } from './CaseUpdateWithWhereUniqueWithoutDentistInput.schema';
import { CaseUpdateManyWithWhereWithoutDentistInputObjectSchema as CaseUpdateManyWithWhereWithoutDentistInputObjectSchema } from './CaseUpdateManyWithWhereWithoutDentistInput.schema';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutDentistInputObjectSchema), z.lazy(() => CaseCreateWithoutDentistInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutDentistInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutDentistInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutDentistInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutDentistInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutDentistInputObjectSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutDentistInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyDentistInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutDentistInputObjectSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutDentistInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutDentistInputObjectSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutDentistInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputObjectSchema), z.lazy(() => CaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseUncheckedUpdateManyWithoutDentistNestedInputObjectSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutDentistNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutDentistNestedInput>;
export const CaseUncheckedUpdateManyWithoutDentistNestedInputObjectZodSchema = makeSchema();
