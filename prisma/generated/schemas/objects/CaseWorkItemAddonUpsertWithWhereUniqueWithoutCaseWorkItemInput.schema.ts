import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonUpdateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUpdateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUpdateWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonUncheckedUpdateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUncheckedUpdateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUncheckedUpdateWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonCreateWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseWorkItemAddonUpdateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedUpdateWithoutCaseWorkItemInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpsertWithWhereUniqueWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpsertWithWhereUniqueWithoutCaseWorkItemInput>;
export const CaseWorkItemAddonUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
