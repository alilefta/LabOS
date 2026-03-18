import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutWorkTypesInputObjectSchema as LabCreateWithoutWorkTypesInputObjectSchema } from './LabCreateWithoutWorkTypesInput.schema';
import { LabUncheckedCreateWithoutWorkTypesInputObjectSchema as LabUncheckedCreateWithoutWorkTypesInputObjectSchema } from './LabUncheckedCreateWithoutWorkTypesInput.schema';
import { LabCreateOrConnectWithoutWorkTypesInputObjectSchema as LabCreateOrConnectWithoutWorkTypesInputObjectSchema } from './LabCreateOrConnectWithoutWorkTypesInput.schema';
import { LabUpsertWithoutWorkTypesInputObjectSchema as LabUpsertWithoutWorkTypesInputObjectSchema } from './LabUpsertWithoutWorkTypesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutWorkTypesInputObjectSchema as LabUpdateToOneWithWhereWithoutWorkTypesInputObjectSchema } from './LabUpdateToOneWithWhereWithoutWorkTypesInput.schema';
import { LabUpdateWithoutWorkTypesInputObjectSchema as LabUpdateWithoutWorkTypesInputObjectSchema } from './LabUpdateWithoutWorkTypesInput.schema';
import { LabUncheckedUpdateWithoutWorkTypesInputObjectSchema as LabUncheckedUpdateWithoutWorkTypesInputObjectSchema } from './LabUncheckedUpdateWithoutWorkTypesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutWorkTypesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutWorkTypesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutWorkTypesInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutWorkTypesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutWorkTypesInputObjectSchema), z.lazy(() => LabUpdateWithoutWorkTypesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutWorkTypesInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutWorkTypesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutWorkTypesNestedInput>;
export const LabUpdateOneRequiredWithoutWorkTypesNestedInputObjectZodSchema = makeSchema();
