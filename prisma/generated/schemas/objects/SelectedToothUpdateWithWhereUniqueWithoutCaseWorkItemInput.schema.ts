import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './SelectedToothWhereUniqueInput.schema';
import { SelectedToothUpdateWithoutCaseWorkItemInputObjectSchema as SelectedToothUpdateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUpdateWithoutCaseWorkItemInput.schema';
import { SelectedToothUncheckedUpdateWithoutCaseWorkItemInputObjectSchema as SelectedToothUncheckedUpdateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUncheckedUpdateWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SelectedToothWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => SelectedToothUpdateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothUncheckedUpdateWithoutCaseWorkItemInputObjectSchema)])
}).strict();
export const SelectedToothUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.SelectedToothUpdateWithWhereUniqueWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUpdateWithWhereUniqueWithoutCaseWorkItemInput>;
export const SelectedToothUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
