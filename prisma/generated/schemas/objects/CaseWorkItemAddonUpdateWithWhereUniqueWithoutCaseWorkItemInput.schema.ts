import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonUpdateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUpdateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUpdateWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonUncheckedUpdateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUncheckedUpdateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUncheckedUpdateWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemAddonUpdateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedUpdateWithoutCaseWorkItemInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateWithWhereUniqueWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateWithWhereUniqueWithoutCaseWorkItemInput>;
export const CaseWorkItemAddonUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
