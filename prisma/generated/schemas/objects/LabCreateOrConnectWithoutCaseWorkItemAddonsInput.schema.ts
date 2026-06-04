import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutCaseWorkItemAddonsInputObjectSchema as LabCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabCreateWithoutCaseWorkItemAddonsInput.schema';
import { LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema as LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUncheckedCreateWithoutCaseWorkItemAddonsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutCaseWorkItemAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutCaseWorkItemAddonsInput>;
export const LabCreateOrConnectWithoutCaseWorkItemAddonsInputObjectZodSchema = makeSchema();
