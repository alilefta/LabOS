import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutSalesRepsInputObjectSchema as CaseUpdateWithoutSalesRepsInputObjectSchema } from './CaseUpdateWithoutSalesRepsInput.schema';
import { CaseUncheckedUpdateWithoutSalesRepsInputObjectSchema as CaseUncheckedUpdateWithoutSalesRepsInputObjectSchema } from './CaseUncheckedUpdateWithoutSalesRepsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateWithoutSalesRepsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutSalesRepsInputObjectSchema)])
}).strict();
export const CaseUpdateWithWhereUniqueWithoutSalesRepsInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutSalesRepsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutSalesRepsInput>;
export const CaseUpdateWithWhereUniqueWithoutSalesRepsInputObjectZodSchema = makeSchema();
