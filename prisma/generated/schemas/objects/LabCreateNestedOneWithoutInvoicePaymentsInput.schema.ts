import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutInvoicePaymentsInputObjectSchema as LabCreateWithoutInvoicePaymentsInputObjectSchema } from './LabCreateWithoutInvoicePaymentsInput.schema';
import { LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema as LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema } from './LabUncheckedCreateWithoutInvoicePaymentsInput.schema';
import { LabCreateOrConnectWithoutInvoicePaymentsInputObjectSchema as LabCreateOrConnectWithoutInvoicePaymentsInputObjectSchema } from './LabCreateOrConnectWithoutInvoicePaymentsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutInvoicePaymentsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutInvoicePaymentsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutInvoicePaymentsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutInvoicePaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutInvoicePaymentsInput>;
export const LabCreateNestedOneWithoutInvoicePaymentsInputObjectZodSchema = makeSchema();
