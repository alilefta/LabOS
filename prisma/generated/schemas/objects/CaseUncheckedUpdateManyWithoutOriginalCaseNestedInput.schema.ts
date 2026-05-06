import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutOriginalCaseInputObjectSchema as CaseCreateWithoutOriginalCaseInputObjectSchema } from './CaseCreateWithoutOriginalCaseInput.schema';
import { CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema as CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema } from './CaseUncheckedCreateWithoutOriginalCaseInput.schema';
import { CaseCreateOrConnectWithoutOriginalCaseInputObjectSchema as CaseCreateOrConnectWithoutOriginalCaseInputObjectSchema } from './CaseCreateOrConnectWithoutOriginalCaseInput.schema';
import { CaseUpsertWithWhereUniqueWithoutOriginalCaseInputObjectSchema as CaseUpsertWithWhereUniqueWithoutOriginalCaseInputObjectSchema } from './CaseUpsertWithWhereUniqueWithoutOriginalCaseInput.schema';
import { CaseCreateManyOriginalCaseInputEnvelopeObjectSchema as CaseCreateManyOriginalCaseInputEnvelopeObjectSchema } from './CaseCreateManyOriginalCaseInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithWhereUniqueWithoutOriginalCaseInputObjectSchema as CaseUpdateWithWhereUniqueWithoutOriginalCaseInputObjectSchema } from './CaseUpdateWithWhereUniqueWithoutOriginalCaseInput.schema';
import { CaseUpdateManyWithWhereWithoutOriginalCaseInputObjectSchema as CaseUpdateManyWithWhereWithoutOriginalCaseInputObjectSchema } from './CaseUpdateManyWithWhereWithoutOriginalCaseInput.schema';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseCreateWithoutOriginalCaseInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutOriginalCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutOriginalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyOriginalCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutOriginalCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutOriginalCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputObjectSchema), z.lazy(() => CaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseUncheckedUpdateManyWithoutOriginalCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutOriginalCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutOriginalCaseNestedInput>;
export const CaseUncheckedUpdateManyWithoutOriginalCaseNestedInputObjectZodSchema = makeSchema();
