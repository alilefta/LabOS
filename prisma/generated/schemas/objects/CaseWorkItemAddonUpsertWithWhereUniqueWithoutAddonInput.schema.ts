import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonUpdateWithoutAddonInputObjectSchema as CaseWorkItemAddonUpdateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUpdateWithoutAddonInput.schema';
import { CaseWorkItemAddonUncheckedUpdateWithoutAddonInputObjectSchema as CaseWorkItemAddonUncheckedUpdateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUncheckedUpdateWithoutAddonInput.schema';
import { CaseWorkItemAddonCreateWithoutAddonInputObjectSchema as CaseWorkItemAddonCreateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonCreateWithoutAddonInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutAddonInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseWorkItemAddonUpdateWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedUpdateWithoutAddonInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonUpsertWithWhereUniqueWithoutAddonInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpsertWithWhereUniqueWithoutAddonInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpsertWithWhereUniqueWithoutAddonInput>;
export const CaseWorkItemAddonUpsertWithWhereUniqueWithoutAddonInputObjectZodSchema = makeSchema();
