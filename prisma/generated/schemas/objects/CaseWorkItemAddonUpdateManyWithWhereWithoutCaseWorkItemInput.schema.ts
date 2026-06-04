import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonScalarWhereInputObjectSchema as CaseWorkItemAddonScalarWhereInputObjectSchema } from './CaseWorkItemAddonScalarWhereInput.schema';
import { CaseWorkItemAddonUpdateManyMutationInputObjectSchema as CaseWorkItemAddonUpdateManyMutationInputObjectSchema } from './CaseWorkItemAddonUpdateManyMutationInput.schema';
import { CaseWorkItemAddonUncheckedUpdateManyWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUncheckedUpdateManyWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUncheckedUpdateManyWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemAddonUpdateManyMutationInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedUpdateManyWithoutCaseWorkItemInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonUpdateManyWithWhereWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithWhereWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithWhereWithoutCaseWorkItemInput>;
export const CaseWorkItemAddonUpdateManyWithWhereWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
