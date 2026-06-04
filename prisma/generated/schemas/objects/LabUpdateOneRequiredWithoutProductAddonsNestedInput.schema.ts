import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutProductAddonsInputObjectSchema as LabCreateWithoutProductAddonsInputObjectSchema } from './LabCreateWithoutProductAddonsInput.schema';
import { LabUncheckedCreateWithoutProductAddonsInputObjectSchema as LabUncheckedCreateWithoutProductAddonsInputObjectSchema } from './LabUncheckedCreateWithoutProductAddonsInput.schema';
import { LabCreateOrConnectWithoutProductAddonsInputObjectSchema as LabCreateOrConnectWithoutProductAddonsInputObjectSchema } from './LabCreateOrConnectWithoutProductAddonsInput.schema';
import { LabUpsertWithoutProductAddonsInputObjectSchema as LabUpsertWithoutProductAddonsInputObjectSchema } from './LabUpsertWithoutProductAddonsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutProductAddonsInputObjectSchema as LabUpdateToOneWithWhereWithoutProductAddonsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutProductAddonsInput.schema';
import { LabUpdateWithoutProductAddonsInputObjectSchema as LabUpdateWithoutProductAddonsInputObjectSchema } from './LabUpdateWithoutProductAddonsInput.schema';
import { LabUncheckedUpdateWithoutProductAddonsInputObjectSchema as LabUncheckedUpdateWithoutProductAddonsInputObjectSchema } from './LabUncheckedUpdateWithoutProductAddonsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutProductAddonsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutProductAddonsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutProductAddonsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutProductAddonsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutProductAddonsInputObjectSchema), z.lazy(() => LabUpdateWithoutProductAddonsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutProductAddonsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutProductAddonsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutProductAddonsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutProductAddonsNestedInput>;
export const LabUpdateOneRequiredWithoutProductAddonsNestedInputObjectZodSchema = makeSchema();
