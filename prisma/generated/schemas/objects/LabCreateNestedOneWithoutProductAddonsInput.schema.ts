import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutProductAddonsInputObjectSchema as LabCreateWithoutProductAddonsInputObjectSchema } from './LabCreateWithoutProductAddonsInput.schema';
import { LabUncheckedCreateWithoutProductAddonsInputObjectSchema as LabUncheckedCreateWithoutProductAddonsInputObjectSchema } from './LabUncheckedCreateWithoutProductAddonsInput.schema';
import { LabCreateOrConnectWithoutProductAddonsInputObjectSchema as LabCreateOrConnectWithoutProductAddonsInputObjectSchema } from './LabCreateOrConnectWithoutProductAddonsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutProductAddonsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutProductAddonsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutProductAddonsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutProductAddonsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutProductAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutProductAddonsInput>;
export const LabCreateNestedOneWithoutProductAddonsInputObjectZodSchema = makeSchema();
