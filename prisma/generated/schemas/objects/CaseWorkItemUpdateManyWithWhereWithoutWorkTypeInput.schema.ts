import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema';
import { CaseWorkItemUpdateManyMutationInputObjectSchema as CaseWorkItemUpdateManyMutationInputObjectSchema } from './CaseWorkItemUpdateManyMutationInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutWorkTypeInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateManyMutationInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutWorkTypeInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateManyWithWhereWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateManyWithWhereWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateManyWithWhereWithoutWorkTypeInput>;
export const CaseWorkItemUpdateManyWithWhereWithoutWorkTypeInputObjectZodSchema = makeSchema();
