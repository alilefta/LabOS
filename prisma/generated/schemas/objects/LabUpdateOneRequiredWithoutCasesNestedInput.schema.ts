import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCasesInputObjectSchema as LabCreateWithoutCasesInputObjectSchema } from './LabCreateWithoutCasesInput.schema';
import { LabUncheckedCreateWithoutCasesInputObjectSchema as LabUncheckedCreateWithoutCasesInputObjectSchema } from './LabUncheckedCreateWithoutCasesInput.schema';
import { LabCreateOrConnectWithoutCasesInputObjectSchema as LabCreateOrConnectWithoutCasesInputObjectSchema } from './LabCreateOrConnectWithoutCasesInput.schema';
import { LabUpsertWithoutCasesInputObjectSchema as LabUpsertWithoutCasesInputObjectSchema } from './LabUpsertWithoutCasesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutCasesInputObjectSchema as LabUpdateToOneWithWhereWithoutCasesInputObjectSchema } from './LabUpdateToOneWithWhereWithoutCasesInput.schema';
import { LabUpdateWithoutCasesInputObjectSchema as LabUpdateWithoutCasesInputObjectSchema } from './LabUpdateWithoutCasesInput.schema';
import { LabUncheckedUpdateWithoutCasesInputObjectSchema as LabUncheckedUpdateWithoutCasesInputObjectSchema } from './LabUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCasesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutCasesInputObjectSchema), z.lazy(() => LabUpdateWithoutCasesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCasesInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutCasesNestedInput>;
export const LabUpdateOneRequiredWithoutCasesNestedInputObjectZodSchema = makeSchema();
