import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './SelectedToothWhereUniqueInput.schema';
import { SelectedToothCreateWithoutCaseWorkItemInputObjectSchema as SelectedToothCreateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothCreateWithoutCaseWorkItemInput.schema';
import { SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema as SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUncheckedCreateWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SelectedToothWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => SelectedToothCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema)])
}).strict();
export const SelectedToothCreateOrConnectWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.SelectedToothCreateOrConnectWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothCreateOrConnectWithoutCaseWorkItemInput>;
export const SelectedToothCreateOrConnectWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
