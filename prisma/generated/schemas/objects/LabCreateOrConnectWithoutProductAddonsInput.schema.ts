import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutProductAddonsInputObjectSchema as LabCreateWithoutProductAddonsInputObjectSchema } from './LabCreateWithoutProductAddonsInput.schema';
import { LabUncheckedCreateWithoutProductAddonsInputObjectSchema as LabUncheckedCreateWithoutProductAddonsInputObjectSchema } from './LabUncheckedCreateWithoutProductAddonsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutProductAddonsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutProductAddonsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutProductAddonsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutProductAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutProductAddonsInput>;
export const LabCreateOrConnectWithoutProductAddonsInputObjectZodSchema = makeSchema();
