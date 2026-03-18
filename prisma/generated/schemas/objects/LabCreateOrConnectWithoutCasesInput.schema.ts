import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutCasesInputObjectSchema as LabCreateWithoutCasesInputObjectSchema } from './LabCreateWithoutCasesInput.schema';
import { LabUncheckedCreateWithoutCasesInputObjectSchema as LabUncheckedCreateWithoutCasesInputObjectSchema } from './LabUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutCasesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutCasesInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutCasesInput>;
export const LabCreateOrConnectWithoutCasesInputObjectZodSchema = makeSchema();
