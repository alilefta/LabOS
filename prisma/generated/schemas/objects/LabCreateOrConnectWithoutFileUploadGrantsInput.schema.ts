import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutFileUploadGrantsInputObjectSchema as LabCreateWithoutFileUploadGrantsInputObjectSchema } from './LabCreateWithoutFileUploadGrantsInput.schema';
import { LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './LabUncheckedCreateWithoutFileUploadGrantsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutFileUploadGrantsInput>;
export const LabCreateOrConnectWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
