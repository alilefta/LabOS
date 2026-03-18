import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema';
import { CaseWorkItemUpdateManyMutationInputObjectSchema as CaseWorkItemUpdateManyMutationInputObjectSchema } from './CaseWorkItemUpdateManyMutationInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutLabInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutLabInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateManyMutationInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateManyWithWhereWithoutLabInput>;
export const CaseWorkItemUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
