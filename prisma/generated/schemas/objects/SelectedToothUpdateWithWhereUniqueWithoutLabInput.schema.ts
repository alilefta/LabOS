import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './SelectedToothWhereUniqueInput.schema';
import { SelectedToothUpdateWithoutLabInputObjectSchema as SelectedToothUpdateWithoutLabInputObjectSchema } from './SelectedToothUpdateWithoutLabInput.schema';
import { SelectedToothUncheckedUpdateWithoutLabInputObjectSchema as SelectedToothUncheckedUpdateWithoutLabInputObjectSchema } from './SelectedToothUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SelectedToothWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => SelectedToothUpdateWithoutLabInputObjectSchema), z.lazy(() => SelectedToothUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const SelectedToothUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.SelectedToothUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUpdateWithWhereUniqueWithoutLabInput>;
export const SelectedToothUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
