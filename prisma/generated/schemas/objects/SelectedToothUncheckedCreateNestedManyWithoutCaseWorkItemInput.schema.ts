import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothCreateWithoutCaseWorkItemInputObjectSchema as SelectedToothCreateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothCreateWithoutCaseWorkItemInput.schema';
import { SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema as SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUncheckedCreateWithoutCaseWorkItemInput.schema';
import { SelectedToothCreateOrConnectWithoutCaseWorkItemInputObjectSchema as SelectedToothCreateOrConnectWithoutCaseWorkItemInputObjectSchema } from './SelectedToothCreateOrConnectWithoutCaseWorkItemInput.schema';
import { SelectedToothCreateManyCaseWorkItemInputEnvelopeObjectSchema as SelectedToothCreateManyCaseWorkItemInputEnvelopeObjectSchema } from './SelectedToothCreateManyCaseWorkItemInputEnvelope.schema';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './SelectedToothWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SelectedToothCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothCreateWithoutCaseWorkItemInputObjectSchema).array(), z.lazy(() => SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SelectedToothCreateOrConnectWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothCreateOrConnectWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => SelectedToothCreateManyCaseWorkItemInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => SelectedToothWhereUniqueInputObjectSchema), z.lazy(() => SelectedToothWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const SelectedToothUncheckedCreateNestedManyWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.SelectedToothUncheckedCreateNestedManyWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUncheckedCreateNestedManyWithoutCaseWorkItemInput>;
export const SelectedToothUncheckedCreateNestedManyWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
