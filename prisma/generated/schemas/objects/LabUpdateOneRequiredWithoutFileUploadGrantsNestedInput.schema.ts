import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutFileUploadGrantsInputObjectSchema as LabCreateWithoutFileUploadGrantsInputObjectSchema } from './LabCreateWithoutFileUploadGrantsInput.schema';
import { LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './LabUncheckedCreateWithoutFileUploadGrantsInput.schema';
import { LabCreateOrConnectWithoutFileUploadGrantsInputObjectSchema as LabCreateOrConnectWithoutFileUploadGrantsInputObjectSchema } from './LabCreateOrConnectWithoutFileUploadGrantsInput.schema';
import { LabUpsertWithoutFileUploadGrantsInputObjectSchema as LabUpsertWithoutFileUploadGrantsInputObjectSchema } from './LabUpsertWithoutFileUploadGrantsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema as LabUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutFileUploadGrantsInput.schema';
import { LabUpdateWithoutFileUploadGrantsInputObjectSchema as LabUpdateWithoutFileUploadGrantsInputObjectSchema } from './LabUpdateWithoutFileUploadGrantsInput.schema';
import { LabUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema as LabUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema } from './LabUncheckedUpdateWithoutFileUploadGrantsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutFileUploadGrantsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutFileUploadGrantsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => LabUpdateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutFileUploadGrantsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutFileUploadGrantsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutFileUploadGrantsNestedInput>;
export const LabUpdateOneRequiredWithoutFileUploadGrantsNestedInputObjectZodSchema = makeSchema();
