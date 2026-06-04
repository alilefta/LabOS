import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCaseWorkItemAddonsInputObjectSchema as LabCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabCreateWithoutCaseWorkItemAddonsInput.schema';
import { LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema as LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUncheckedCreateWithoutCaseWorkItemAddonsInput.schema';
import { LabCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema as LabCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema } from './LabCreateOrConnectWithoutCaseWorkItemAddonsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutCaseWorkItemAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutCaseWorkItemAddonsInput>;
export const LabCreateNestedOneWithoutCaseWorkItemAddonsInputObjectZodSchema = makeSchema();
