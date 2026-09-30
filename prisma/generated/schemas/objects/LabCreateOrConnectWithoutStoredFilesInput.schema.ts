import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutStoredFilesInputObjectSchema as LabCreateWithoutStoredFilesInputObjectSchema } from './LabCreateWithoutStoredFilesInput.schema';
import { LabUncheckedCreateWithoutStoredFilesInputObjectSchema as LabUncheckedCreateWithoutStoredFilesInputObjectSchema } from './LabUncheckedCreateWithoutStoredFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutStoredFilesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStoredFilesInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutStoredFilesInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutStoredFilesInput>;
export const LabCreateOrConnectWithoutStoredFilesInputObjectZodSchema = makeSchema();
