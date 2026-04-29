import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutInvoicePaymentsInputObjectSchema as LabUpdateWithoutInvoicePaymentsInputObjectSchema } from './LabUpdateWithoutInvoicePaymentsInput.schema';
import { LabUncheckedUpdateWithoutInvoicePaymentsInputObjectSchema as LabUncheckedUpdateWithoutInvoicePaymentsInputObjectSchema } from './LabUncheckedUpdateWithoutInvoicePaymentsInput.schema';
import { LabCreateWithoutInvoicePaymentsInputObjectSchema as LabCreateWithoutInvoicePaymentsInputObjectSchema } from './LabCreateWithoutInvoicePaymentsInput.schema';
import { LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema as LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema } from './LabUncheckedCreateWithoutInvoicePaymentsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutInvoicePaymentsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvoicePaymentsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutInvoicePaymentsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutInvoicePaymentsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutInvoicePaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutInvoicePaymentsInput>;
export const LabUpsertWithoutInvoicePaymentsInputObjectZodSchema = makeSchema();
