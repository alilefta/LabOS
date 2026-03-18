import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutSalesRepsInputObjectSchema as CaseCreateWithoutSalesRepsInputObjectSchema } from './CaseCreateWithoutSalesRepsInput.schema';
import { CaseUncheckedCreateWithoutSalesRepsInputObjectSchema as CaseUncheckedCreateWithoutSalesRepsInputObjectSchema } from './CaseUncheckedCreateWithoutSalesRepsInput.schema';
import { CaseCreateOrConnectWithoutSalesRepsInputObjectSchema as CaseCreateOrConnectWithoutSalesRepsInputObjectSchema } from './CaseCreateOrConnectWithoutSalesRepsInput.schema';
import { CaseUpsertWithWhereUniqueWithoutSalesRepsInputObjectSchema as CaseUpsertWithWhereUniqueWithoutSalesRepsInputObjectSchema } from './CaseUpsertWithWhereUniqueWithoutSalesRepsInput.schema';
import { CaseCreateManySalesRepsInputEnvelopeObjectSchema as CaseCreateManySalesRepsInputEnvelopeObjectSchema } from './CaseCreateManySalesRepsInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithWhereUniqueWithoutSalesRepsInputObjectSchema as CaseUpdateWithWhereUniqueWithoutSalesRepsInputObjectSchema } from './CaseUpdateWithWhereUniqueWithoutSalesRepsInput.schema';
import { CaseUpdateManyWithWhereWithoutSalesRepsInputObjectSchema as CaseUpdateManyWithWhereWithoutSalesRepsInputObjectSchema } from './CaseUpdateManyWithWhereWithoutSalesRepsInput.schema';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseCreateWithoutSalesRepsInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutSalesRepsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutSalesRepsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutSalesRepsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManySalesRepsInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutSalesRepsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutSalesRepsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputObjectSchema), z.lazy(() => CaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseUncheckedUpdateManyWithoutSalesRepsNestedInputObjectSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutSalesRepsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutSalesRepsNestedInput>;
export const CaseUncheckedUpdateManyWithoutSalesRepsNestedInputObjectZodSchema = makeSchema();
