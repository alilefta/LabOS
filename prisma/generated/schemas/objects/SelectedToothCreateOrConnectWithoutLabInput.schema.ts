import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './SelectedToothWhereUniqueInput.schema';
import { SelectedToothCreateWithoutLabInputObjectSchema as SelectedToothCreateWithoutLabInputObjectSchema } from './SelectedToothCreateWithoutLabInput.schema';
import { SelectedToothUncheckedCreateWithoutLabInputObjectSchema as SelectedToothUncheckedCreateWithoutLabInputObjectSchema } from './SelectedToothUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SelectedToothWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => SelectedToothCreateWithoutLabInputObjectSchema), z.lazy(() => SelectedToothUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const SelectedToothCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.SelectedToothCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothCreateOrConnectWithoutLabInput>;
export const SelectedToothCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
