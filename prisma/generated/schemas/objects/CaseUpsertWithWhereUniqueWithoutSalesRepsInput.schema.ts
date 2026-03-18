import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutSalesRepsInputObjectSchema as CaseUpdateWithoutSalesRepsInputObjectSchema } from './CaseUpdateWithoutSalesRepsInput.schema';
import { CaseUncheckedUpdateWithoutSalesRepsInputObjectSchema as CaseUncheckedUpdateWithoutSalesRepsInputObjectSchema } from './CaseUncheckedUpdateWithoutSalesRepsInput.schema';
import { CaseCreateWithoutSalesRepsInputObjectSchema as CaseCreateWithoutSalesRepsInputObjectSchema } from './CaseCreateWithoutSalesRepsInput.schema';
import { CaseUncheckedCreateWithoutSalesRepsInputObjectSchema as CaseUncheckedCreateWithoutSalesRepsInputObjectSchema } from './CaseUncheckedCreateWithoutSalesRepsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseUpdateWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutSalesRepsInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutSalesRepsInputObjectSchema)])
}).strict();
export const CaseUpsertWithWhereUniqueWithoutSalesRepsInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutSalesRepsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutSalesRepsInput>;
export const CaseUpsertWithWhereUniqueWithoutSalesRepsInputObjectZodSchema = makeSchema();
