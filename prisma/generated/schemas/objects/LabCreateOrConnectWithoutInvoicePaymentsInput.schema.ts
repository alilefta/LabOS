import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutInvoicePaymentsInputObjectSchema as LabCreateWithoutInvoicePaymentsInputObjectSchema } from './LabCreateWithoutInvoicePaymentsInput.schema';
import { LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema as LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema } from './LabUncheckedCreateWithoutInvoicePaymentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutInvoicePaymentsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutInvoicePaymentsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutInvoicePaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutInvoicePaymentsInput>;
export const LabCreateOrConnectWithoutInvoicePaymentsInputObjectZodSchema = makeSchema();
