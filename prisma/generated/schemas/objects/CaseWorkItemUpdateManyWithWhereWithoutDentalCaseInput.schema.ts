import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema';
import { CaseWorkItemUpdateManyMutationInputObjectSchema as CaseWorkItemUpdateManyMutationInputObjectSchema } from './CaseWorkItemUpdateManyMutationInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutDentalCaseInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateManyMutationInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateManyWithWhereWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateManyWithWhereWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateManyWithWhereWithoutDentalCaseInput>;
export const CaseWorkItemUpdateManyWithWhereWithoutDentalCaseInputObjectZodSchema = makeSchema();
