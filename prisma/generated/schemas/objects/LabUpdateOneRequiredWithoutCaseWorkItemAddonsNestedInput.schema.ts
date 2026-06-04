import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCaseWorkItemAddonsInputObjectSchema as LabCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabCreateWithoutCaseWorkItemAddonsInput.schema';
import { LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema as LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUncheckedCreateWithoutCaseWorkItemAddonsInput.schema';
import { LabCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema as LabCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema } from './LabCreateOrConnectWithoutCaseWorkItemAddonsInput.schema';
import { LabUpsertWithoutCaseWorkItemAddonsInputObjectSchema as LabUpsertWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUpsertWithoutCaseWorkItemAddonsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutCaseWorkItemAddonsInputObjectSchema as LabUpdateToOneWithWhereWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutCaseWorkItemAddonsInput.schema';
import { LabUpdateWithoutCaseWorkItemAddonsInputObjectSchema as LabUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUpdateWithoutCaseWorkItemAddonsInput.schema';
import { LabUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema as LabUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUncheckedUpdateWithoutCaseWorkItemAddonsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutCaseWorkItemAddonsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => LabUpdateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInput>;
export const LabUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInputObjectZodSchema = makeSchema();
