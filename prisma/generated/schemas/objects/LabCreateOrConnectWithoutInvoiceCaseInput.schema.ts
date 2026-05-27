import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutInvoiceCaseInputObjectSchema as LabCreateWithoutInvoiceCaseInputObjectSchema } from './LabCreateWithoutInvoiceCaseInput.schema';
import { LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema as LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema } from './LabUncheckedCreateWithoutInvoiceCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutInvoiceCaseInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutInvoiceCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutInvoiceCaseInput>;
export const LabCreateOrConnectWithoutInvoiceCaseInputObjectZodSchema = makeSchema();
