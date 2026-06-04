import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonUpdateWithoutLabInputObjectSchema as CaseWorkItemAddonUpdateWithoutLabInputObjectSchema } from './CaseWorkItemAddonUpdateWithoutLabInput.schema';
import { CaseWorkItemAddonUncheckedUpdateWithoutLabInputObjectSchema as CaseWorkItemAddonUncheckedUpdateWithoutLabInputObjectSchema } from './CaseWorkItemAddonUncheckedUpdateWithoutLabInput.schema';
import { CaseWorkItemAddonCreateWithoutLabInputObjectSchema as CaseWorkItemAddonCreateWithoutLabInputObjectSchema } from './CaseWorkItemAddonCreateWithoutLabInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseWorkItemAddonUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpsertWithWhereUniqueWithoutLabInput>;
export const CaseWorkItemAddonUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
