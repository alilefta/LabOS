import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutFileUploadGrantsInputObjectSchema as LabCreateWithoutFileUploadGrantsInputObjectSchema } from './LabCreateWithoutFileUploadGrantsInput.schema';
import { LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './LabUncheckedCreateWithoutFileUploadGrantsInput.schema';
import { LabCreateOrConnectWithoutFileUploadGrantsInputObjectSchema as LabCreateOrConnectWithoutFileUploadGrantsInputObjectSchema } from './LabCreateOrConnectWithoutFileUploadGrantsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutFileUploadGrantsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutFileUploadGrantsInput>;
export const LabCreateNestedOneWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
