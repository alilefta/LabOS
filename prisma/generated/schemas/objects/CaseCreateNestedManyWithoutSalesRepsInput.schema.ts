import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutSalesRepsInputObjectSchema as CaseCreateWithoutSalesRepsInputObjectSchema } from './CaseCreateWithoutSalesRepsInput.schema';
import { CaseUncheckedCreateWithoutSalesRepsInputObjectSchema as CaseUncheckedCreateWithoutSalesRepsInputObjectSchema } from './CaseUncheckedCreateWithoutSalesRepsInput.schema';
import { CaseCreateOrConnectWithoutSalesRepsInputObjectSchema as CaseCreateOrConnectWithoutSalesRepsInputObjectSchema } from './CaseCreateOrConnectWithoutSalesRepsInput.schema';
import { CaseCreateManySalesRepsInputEnvelopeObjectSchema as CaseCreateManySalesRepsInputEnvelopeObjectSchema } from './CaseCreateManySalesRepsInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseCreateWithoutSalesRepsInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutSalesRepsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutSalesRepsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManySalesRepsInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseCreateNestedManyWithoutSalesRepsInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedManyWithoutSalesRepsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedManyWithoutSalesRepsInput>;
export const CaseCreateNestedManyWithoutSalesRepsInputObjectZodSchema = makeSchema();
