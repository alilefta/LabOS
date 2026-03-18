import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothCreateWithoutLabInputObjectSchema as SelectedToothCreateWithoutLabInputObjectSchema } from './SelectedToothCreateWithoutLabInput.schema';
import { SelectedToothUncheckedCreateWithoutLabInputObjectSchema as SelectedToothUncheckedCreateWithoutLabInputObjectSchema } from './SelectedToothUncheckedCreateWithoutLabInput.schema';
import { SelectedToothCreateOrConnectWithoutLabInputObjectSchema as SelectedToothCreateOrConnectWithoutLabInputObjectSchema } from './SelectedToothCreateOrConnectWithoutLabInput.schema';
import { SelectedToothCreateManyLabInputEnvelopeObjectSchema as SelectedToothCreateManyLabInputEnvelopeObjectSchema } from './SelectedToothCreateManyLabInputEnvelope.schema';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './SelectedToothWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SelectedToothCreateWithoutLabInputObjectSchema), z.lazy(() => SelectedToothCreateWithoutLabInputObjectSchema).array(), z.lazy(() => SelectedToothUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => SelectedToothUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SelectedToothCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => SelectedToothCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => SelectedToothCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => SelectedToothWhereUniqueInputObjectSchema), z.lazy(() => SelectedToothWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.SelectedToothUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUncheckedCreateNestedManyWithoutLabInput>;
export const SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
