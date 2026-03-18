import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema';
import { CaseUpdateManyMutationInputObjectSchema as CaseUpdateManyMutationInputObjectSchema } from './CaseUpdateManyMutationInput.schema';
import { CaseUncheckedUpdateManyWithoutSalesRepsInputObjectSchema as CaseUncheckedUpdateManyWithoutSalesRepsInputObjectSchema } from './CaseUncheckedUpdateManyWithoutSalesRepsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateManyMutationInputObjectSchema), z.lazy(() => CaseUncheckedUpdateManyWithoutSalesRepsInputObjectSchema)])
}).strict();
export const CaseUpdateManyWithWhereWithoutSalesRepsInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutSalesRepsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutSalesRepsInput>;
export const CaseUpdateManyWithWhereWithoutSalesRepsInputObjectZodSchema = makeSchema();
