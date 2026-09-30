import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutStoredFilesInputObjectSchema as LabCreateWithoutStoredFilesInputObjectSchema } from './LabCreateWithoutStoredFilesInput.schema';
import { LabUncheckedCreateWithoutStoredFilesInputObjectSchema as LabUncheckedCreateWithoutStoredFilesInputObjectSchema } from './LabUncheckedCreateWithoutStoredFilesInput.schema';
import { LabCreateOrConnectWithoutStoredFilesInputObjectSchema as LabCreateOrConnectWithoutStoredFilesInputObjectSchema } from './LabCreateOrConnectWithoutStoredFilesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutStoredFilesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStoredFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutStoredFilesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutStoredFilesInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutStoredFilesInput>;
export const LabCreateNestedOneWithoutStoredFilesInputObjectZodSchema = makeSchema();
