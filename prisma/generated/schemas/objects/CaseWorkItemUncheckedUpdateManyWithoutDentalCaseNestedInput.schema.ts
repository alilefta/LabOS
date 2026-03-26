import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutDentalCaseInputObjectSchema as CaseWorkItemCreateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemCreateWithoutDentalCaseInput.schema';
import { CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutDentalCaseInput.schema';
import { CaseWorkItemCreateOrConnectWithoutDentalCaseInputObjectSchema as CaseWorkItemCreateOrConnectWithoutDentalCaseInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutDentalCaseInput.schema';
import { CaseWorkItemUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema as CaseWorkItemUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUpsertWithWhereUniqueWithoutDentalCaseInput.schema';
import { CaseWorkItemCreateManyDentalCaseInputEnvelopeObjectSchema as CaseWorkItemCreateManyDentalCaseInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyDentalCaseInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema as CaseWorkItemUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUpdateWithWhereUniqueWithoutDentalCaseInput.schema';
import { CaseWorkItemUpdateManyWithWhereWithoutDentalCaseInputObjectSchema as CaseWorkItemUpdateManyWithWhereWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUpdateManyWithWhereWithoutDentalCaseInput.schema';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutDentalCaseInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutDentalCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyDentalCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutDentalCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInput>;
export const CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInputObjectZodSchema = makeSchema();
