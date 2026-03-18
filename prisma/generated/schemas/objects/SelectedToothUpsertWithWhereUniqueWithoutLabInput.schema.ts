import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './SelectedToothWhereUniqueInput.schema';
import { SelectedToothUpdateWithoutLabInputObjectSchema as SelectedToothUpdateWithoutLabInputObjectSchema } from './SelectedToothUpdateWithoutLabInput.schema';
import { SelectedToothUncheckedUpdateWithoutLabInputObjectSchema as SelectedToothUncheckedUpdateWithoutLabInputObjectSchema } from './SelectedToothUncheckedUpdateWithoutLabInput.schema';
import { SelectedToothCreateWithoutLabInputObjectSchema as SelectedToothCreateWithoutLabInputObjectSchema } from './SelectedToothCreateWithoutLabInput.schema';
import { SelectedToothUncheckedCreateWithoutLabInputObjectSchema as SelectedToothUncheckedCreateWithoutLabInputObjectSchema } from './SelectedToothUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SelectedToothWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => SelectedToothUpdateWithoutLabInputObjectSchema), z.lazy(() => SelectedToothUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => SelectedToothCreateWithoutLabInputObjectSchema), z.lazy(() => SelectedToothUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const SelectedToothUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.SelectedToothUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUpsertWithWhereUniqueWithoutLabInput>;
export const SelectedToothUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
