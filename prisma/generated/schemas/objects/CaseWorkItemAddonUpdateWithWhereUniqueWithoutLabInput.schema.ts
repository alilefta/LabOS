import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonUpdateWithoutLabInputObjectSchema as CaseWorkItemAddonUpdateWithoutLabInputObjectSchema } from './CaseWorkItemAddonUpdateWithoutLabInput.schema';
import { CaseWorkItemAddonUncheckedUpdateWithoutLabInputObjectSchema as CaseWorkItemAddonUncheckedUpdateWithoutLabInputObjectSchema } from './CaseWorkItemAddonUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemAddonUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateWithWhereUniqueWithoutLabInput>;
export const CaseWorkItemAddonUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
