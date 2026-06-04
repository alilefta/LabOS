import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonScalarWhereInputObjectSchema as CaseWorkItemAddonScalarWhereInputObjectSchema } from './CaseWorkItemAddonScalarWhereInput.schema';
import { CaseWorkItemAddonUpdateManyMutationInputObjectSchema as CaseWorkItemAddonUpdateManyMutationInputObjectSchema } from './CaseWorkItemAddonUpdateManyMutationInput.schema';
import { CaseWorkItemAddonUncheckedUpdateManyWithoutAddonInputObjectSchema as CaseWorkItemAddonUncheckedUpdateManyWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUncheckedUpdateManyWithoutAddonInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemAddonUpdateManyMutationInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedUpdateManyWithoutAddonInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonUpdateManyWithWhereWithoutAddonInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithWhereWithoutAddonInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithWhereWithoutAddonInput>;
export const CaseWorkItemAddonUpdateManyWithWhereWithoutAddonInputObjectZodSchema = makeSchema();
