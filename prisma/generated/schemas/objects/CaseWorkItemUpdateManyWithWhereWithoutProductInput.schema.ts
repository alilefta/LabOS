import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema';
import { CaseWorkItemUpdateManyMutationInputObjectSchema as CaseWorkItemUpdateManyMutationInputObjectSchema } from './CaseWorkItemUpdateManyMutationInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutProductInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutProductInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateManyMutationInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutProductInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateManyWithWhereWithoutProductInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateManyWithWhereWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateManyWithWhereWithoutProductInput>;
export const CaseWorkItemUpdateManyWithWhereWithoutProductInputObjectZodSchema = makeSchema();
