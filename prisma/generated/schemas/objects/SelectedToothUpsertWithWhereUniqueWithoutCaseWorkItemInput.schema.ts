import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './SelectedToothWhereUniqueInput.schema';
import { SelectedToothUpdateWithoutCaseWorkItemInputObjectSchema as SelectedToothUpdateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUpdateWithoutCaseWorkItemInput.schema';
import { SelectedToothUncheckedUpdateWithoutCaseWorkItemInputObjectSchema as SelectedToothUncheckedUpdateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUncheckedUpdateWithoutCaseWorkItemInput.schema';
import { SelectedToothCreateWithoutCaseWorkItemInputObjectSchema as SelectedToothCreateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothCreateWithoutCaseWorkItemInput.schema';
import { SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema as SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUncheckedCreateWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SelectedToothWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => SelectedToothUpdateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothUncheckedUpdateWithoutCaseWorkItemInputObjectSchema)]),
  create: z.union([z.lazy(() => SelectedToothCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema)])
}).strict();
export const SelectedToothUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.SelectedToothUpsertWithWhereUniqueWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUpsertWithWhereUniqueWithoutCaseWorkItemInput>;
export const SelectedToothUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
