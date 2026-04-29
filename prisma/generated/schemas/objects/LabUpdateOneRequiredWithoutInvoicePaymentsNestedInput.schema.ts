import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutInvoicePaymentsInputObjectSchema as LabCreateWithoutInvoicePaymentsInputObjectSchema } from './LabCreateWithoutInvoicePaymentsInput.schema';
import { LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema as LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema } from './LabUncheckedCreateWithoutInvoicePaymentsInput.schema';
import { LabCreateOrConnectWithoutInvoicePaymentsInputObjectSchema as LabCreateOrConnectWithoutInvoicePaymentsInputObjectSchema } from './LabCreateOrConnectWithoutInvoicePaymentsInput.schema';
import { LabUpsertWithoutInvoicePaymentsInputObjectSchema as LabUpsertWithoutInvoicePaymentsInputObjectSchema } from './LabUpsertWithoutInvoicePaymentsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutInvoicePaymentsInputObjectSchema as LabUpdateToOneWithWhereWithoutInvoicePaymentsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutInvoicePaymentsInput.schema';
import { LabUpdateWithoutInvoicePaymentsInputObjectSchema as LabUpdateWithoutInvoicePaymentsInputObjectSchema } from './LabUpdateWithoutInvoicePaymentsInput.schema';
import { LabUncheckedUpdateWithoutInvoicePaymentsInputObjectSchema as LabUncheckedUpdateWithoutInvoicePaymentsInputObjectSchema } from './LabUncheckedUpdateWithoutInvoicePaymentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutInvoicePaymentsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoicePaymentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutInvoicePaymentsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutInvoicePaymentsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutInvoicePaymentsInputObjectSchema), z.lazy(() => LabUpdateWithoutInvoicePaymentsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvoicePaymentsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutInvoicePaymentsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutInvoicePaymentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutInvoicePaymentsNestedInput>;
export const LabUpdateOneRequiredWithoutInvoicePaymentsNestedInputObjectZodSchema = makeSchema();
