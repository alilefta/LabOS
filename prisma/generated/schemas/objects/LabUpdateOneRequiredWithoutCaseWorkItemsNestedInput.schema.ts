import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCaseWorkItemsInputObjectSchema as LabCreateWithoutCaseWorkItemsInputObjectSchema } from './LabCreateWithoutCaseWorkItemsInput.schema';
import { LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './LabUncheckedCreateWithoutCaseWorkItemsInput.schema';
import { LabCreateOrConnectWithoutCaseWorkItemsInputObjectSchema as LabCreateOrConnectWithoutCaseWorkItemsInputObjectSchema } from './LabCreateOrConnectWithoutCaseWorkItemsInput.schema';
import { LabUpsertWithoutCaseWorkItemsInputObjectSchema as LabUpsertWithoutCaseWorkItemsInputObjectSchema } from './LabUpsertWithoutCaseWorkItemsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema as LabUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutCaseWorkItemsInput.schema';
import { LabUpdateWithoutCaseWorkItemsInputObjectSchema as LabUpdateWithoutCaseWorkItemsInputObjectSchema } from './LabUpdateWithoutCaseWorkItemsInput.schema';
import { LabUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema as LabUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema } from './LabUncheckedUpdateWithoutCaseWorkItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCaseWorkItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutCaseWorkItemsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => LabUpdateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutCaseWorkItemsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutCaseWorkItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutCaseWorkItemsNestedInput>;
export const LabUpdateOneRequiredWithoutCaseWorkItemsNestedInputObjectZodSchema = makeSchema();
