import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothScalarWhereInputObjectSchema as SelectedToothScalarWhereInputObjectSchema } from './SelectedToothScalarWhereInput.schema';
import { SelectedToothUpdateManyMutationInputObjectSchema as SelectedToothUpdateManyMutationInputObjectSchema } from './SelectedToothUpdateManyMutationInput.schema';
import { SelectedToothUncheckedUpdateManyWithoutLabInputObjectSchema as SelectedToothUncheckedUpdateManyWithoutLabInputObjectSchema } from './SelectedToothUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SelectedToothScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => SelectedToothUpdateManyMutationInputObjectSchema), z.lazy(() => SelectedToothUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const SelectedToothUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.SelectedToothUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUpdateManyWithWhereWithoutLabInput>;
export const SelectedToothUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
