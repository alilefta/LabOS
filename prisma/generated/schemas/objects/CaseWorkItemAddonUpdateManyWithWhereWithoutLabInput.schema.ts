import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonScalarWhereInputObjectSchema as CaseWorkItemAddonScalarWhereInputObjectSchema } from './CaseWorkItemAddonScalarWhereInput.schema';
import { CaseWorkItemAddonUpdateManyMutationInputObjectSchema as CaseWorkItemAddonUpdateManyMutationInputObjectSchema } from './CaseWorkItemAddonUpdateManyMutationInput.schema';
import { CaseWorkItemAddonUncheckedUpdateManyWithoutLabInputObjectSchema as CaseWorkItemAddonUncheckedUpdateManyWithoutLabInputObjectSchema } from './CaseWorkItemAddonUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemAddonUpdateManyMutationInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithWhereWithoutLabInput>;
export const CaseWorkItemAddonUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
