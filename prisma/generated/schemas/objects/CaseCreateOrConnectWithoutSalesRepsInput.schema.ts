import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutSalesRepsInputObjectSchema as CaseCreateWithoutSalesRepsInputObjectSchema } from './CaseCreateWithoutSalesRepsInput.schema';
import { CaseUncheckedCreateWithoutSalesRepsInputObjectSchema as CaseUncheckedCreateWithoutSalesRepsInputObjectSchema } from './CaseUncheckedCreateWithoutSalesRepsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutSalesRepsInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutSalesRepsInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutSalesRepsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutSalesRepsInput>;
export const CaseCreateOrConnectWithoutSalesRepsInputObjectZodSchema = makeSchema();
