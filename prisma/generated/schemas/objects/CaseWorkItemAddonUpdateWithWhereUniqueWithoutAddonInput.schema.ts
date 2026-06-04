import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonUpdateWithoutAddonInputObjectSchema as CaseWorkItemAddonUpdateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUpdateWithoutAddonInput.schema';
import { CaseWorkItemAddonUncheckedUpdateWithoutAddonInputObjectSchema as CaseWorkItemAddonUncheckedUpdateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUncheckedUpdateWithoutAddonInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemAddonUpdateWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedUpdateWithoutAddonInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonUpdateWithWhereUniqueWithoutAddonInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateWithWhereUniqueWithoutAddonInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateWithWhereUniqueWithoutAddonInput>;
export const CaseWorkItemAddonUpdateWithWhereUniqueWithoutAddonInputObjectZodSchema = makeSchema();
