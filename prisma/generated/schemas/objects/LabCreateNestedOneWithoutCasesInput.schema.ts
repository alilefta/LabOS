import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCasesInputObjectSchema as LabCreateWithoutCasesInputObjectSchema } from './LabCreateWithoutCasesInput.schema';
import { LabUncheckedCreateWithoutCasesInputObjectSchema as LabUncheckedCreateWithoutCasesInputObjectSchema } from './LabUncheckedCreateWithoutCasesInput.schema';
import { LabCreateOrConnectWithoutCasesInputObjectSchema as LabCreateOrConnectWithoutCasesInputObjectSchema } from './LabCreateOrConnectWithoutCasesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCasesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutCasesInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutCasesInput>;
export const LabCreateNestedOneWithoutCasesInputObjectZodSchema = makeSchema();
