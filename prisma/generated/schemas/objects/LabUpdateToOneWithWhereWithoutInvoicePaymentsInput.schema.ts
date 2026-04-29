import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutInvoicePaymentsInputObjectSchema as LabUpdateWithoutInvoicePaymentsInputObjectSchema } from './LabUpdateWithoutInvoicePaymentsInput.schema';
import { LabUncheckedUpdateWithoutInvoicePaymentsInputObjectSchema as LabUncheckedUpdateWithoutInvoicePaymentsInputObjectSchema } from './LabUncheckedUpdateWithoutInvoicePaymentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutInvoicePaymentsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvoicePaymentsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutInvoicePaymentsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutInvoicePaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutInvoicePaymentsInput>;
export const LabUpdateToOneWithWhereWithoutInvoicePaymentsInputObjectZodSchema = makeSchema();
