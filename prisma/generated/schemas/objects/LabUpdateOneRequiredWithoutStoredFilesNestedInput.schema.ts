import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutStoredFilesInputObjectSchema as LabCreateWithoutStoredFilesInputObjectSchema } from './LabCreateWithoutStoredFilesInput.schema';
import { LabUncheckedCreateWithoutStoredFilesInputObjectSchema as LabUncheckedCreateWithoutStoredFilesInputObjectSchema } from './LabUncheckedCreateWithoutStoredFilesInput.schema';
import { LabCreateOrConnectWithoutStoredFilesInputObjectSchema as LabCreateOrConnectWithoutStoredFilesInputObjectSchema } from './LabCreateOrConnectWithoutStoredFilesInput.schema';
import { LabUpsertWithoutStoredFilesInputObjectSchema as LabUpsertWithoutStoredFilesInputObjectSchema } from './LabUpsertWithoutStoredFilesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutStoredFilesInputObjectSchema as LabUpdateToOneWithWhereWithoutStoredFilesInputObjectSchema } from './LabUpdateToOneWithWhereWithoutStoredFilesInput.schema';
import { LabUpdateWithoutStoredFilesInputObjectSchema as LabUpdateWithoutStoredFilesInputObjectSchema } from './LabUpdateWithoutStoredFilesInput.schema';
import { LabUncheckedUpdateWithoutStoredFilesInputObjectSchema as LabUncheckedUpdateWithoutStoredFilesInputObjectSchema } from './LabUncheckedUpdateWithoutStoredFilesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutStoredFilesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStoredFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutStoredFilesInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutStoredFilesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutStoredFilesInputObjectSchema), z.lazy(() => LabUpdateWithoutStoredFilesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStoredFilesInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutStoredFilesNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutStoredFilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutStoredFilesNestedInput>;
export const LabUpdateOneRequiredWithoutStoredFilesNestedInputObjectZodSchema = makeSchema();
