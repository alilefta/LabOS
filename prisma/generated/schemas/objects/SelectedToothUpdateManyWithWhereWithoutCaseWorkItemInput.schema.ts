import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothScalarWhereInputObjectSchema as SelectedToothScalarWhereInputObjectSchema } from './SelectedToothScalarWhereInput.schema';
import { SelectedToothUpdateManyMutationInputObjectSchema as SelectedToothUpdateManyMutationInputObjectSchema } from './SelectedToothUpdateManyMutationInput.schema';
import { SelectedToothUncheckedUpdateManyWithoutCaseWorkItemInputObjectSchema as SelectedToothUncheckedUpdateManyWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUncheckedUpdateManyWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SelectedToothScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => SelectedToothUpdateManyMutationInputObjectSchema), z.lazy(() => SelectedToothUncheckedUpdateManyWithoutCaseWorkItemInputObjectSchema)])
}).strict();
export const SelectedToothUpdateManyWithWhereWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.SelectedToothUpdateManyWithWhereWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUpdateManyWithWhereWithoutCaseWorkItemInput>;
export const SelectedToothUpdateManyWithWhereWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
